import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'dart:convert';
import 'auth_provider.dart';
import 'api_service.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => AuthProvider()..tryAutoLogin(),
      child: const BookstoreApp(),
    ),
  );
}

class BookstoreApp extends StatelessWidget {
  const BookstoreApp({super.key});
  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(brightness: Brightness.dark, primaryColor: const Color(0xFF6366F1), scaffoldBackgroundColor: const Color(0xFF0F172A)),
      home: auth.isAuthenticated ? const Dashboard() : const LoginPage(),
    );
  }
}

// --- LOGIN SCREEN ---
class LoginPage extends StatefulWidget {
  const LoginPage({super.key});
  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _user = TextEditingController();
  final _pass = TextEditingController();
  final _api = ApiService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(30),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          const Icon(Icons.rocket_launch, size: 80, color: Color(0xFF6366F1)),
          const SizedBox(height: 20),
          const Text("STORE LOGIN", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
          TextField(controller: _user, decoration: const InputDecoration(labelText: "Username")),
          TextField(controller: _pass, obscureText: true, decoration: const InputDecoration(labelText: "Password")),
          const SizedBox(height: 30),
          ElevatedButton(
            style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(50), backgroundColor: const Color(0xFF6366F1)),
            onPressed: () async {
              final res = await _api.login(_user.text, _pass.text);
              if (res.statusCode == 200) {
                context.read<AuthProvider>().setToken(jsonDecode(res.body)['token']);
              }
            },
            child: const Text("LOGIN"),
          )
        ]),
      ),
    );
  }
}

// --- DASHBOARD (MIRRORS NAVBAR) ---
class Dashboard extends StatefulWidget {
  const Dashboard({super.key});
  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  int _index = 0;
  final List<String> _paths = ['books', 'phones', 'tickets', 'laptops'];

  @override
  Widget build(BuildContext context) {
    final auth = context.read<AuthProvider>();
    return Scaffold(
      appBar: AppBar(title: Text(_paths[_index].toUpperCase()), actions: [
        IconButton(onPressed: () => auth.setToken(null), icon: const Icon(Icons.logout))
      ]),
      body: ProductList(path: _paths[_index]),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _index,
        onTap: (v) => setState(() => _index = v),
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.book), label: "Books"),
          BottomNavigationBarItem(icon: Icon(Icons.phone_android), label: "Phones"),
          BottomNavigationBarItem(icon: Icon(Icons.confirmation_number), label: "Tickets"),
          BottomNavigationBarItem(icon: Icon(Icons.laptop), label: "Laptops"),
        ],
      ),
      // FLOATING ADD BUTTON: ONLY FOR ADMINS
      floatingActionButton: auth.isAdmin ? FloatingActionButton(
        backgroundColor: const Color(0xFF6366F1),
        child: const Icon(Icons.add),
        onPressed: () => _openForm(context, _paths[_index]),
      ) : null,
    );
  }

  void _openForm(BuildContext context, String path) {
    Navigator.push(context, MaterialPageRoute(builder: (c) => ProductForm(path: path)));
  }
}

// --- PRODUCT LIST (WITH ROLE PROTECTION) ---
class ProductList extends StatefulWidget {
  final String path;
  const ProductList({super.key, required this.path});
  @override
  State<ProductList> createState() => _ProductListState();
}

class _ProductListState extends State<ProductList> {
  final _api = ApiService();

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    return FutureBuilder<List<dynamic>>(
      future: _api.getAll(widget.path, auth.token),
      builder: (context, snap) {
        if (!snap.hasData) return const Center(child: CircularProgressIndicator());
        return ListView.builder(
          itemCount: snap.data!.length,
          itemBuilder: (context, i) {
            final item = snap.data![i];
            return Card(
              margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 8),
              child: ListTile(
                title: Text(item['title'] ?? item['brand'] ?? item['description'] ?? "Item"),
                subtitle: Text("\$${item['price']}"),
                trailing: Row(mainAxisSize: MainAxisSize.min, children: [
                  // ALWAYS VISIBLE: Add to Cart
                  IconButton(icon: const Icon(Icons.add_shopping_cart, color: Colors.green),
                      onPressed: () => _api.addToCart(item['id'], auth.token).then((_) => ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Added to Cart!"))))),

                  // ADMIN ONLY: Edit and Delete
                  if (auth.isAdmin) ...[
                    IconButton(icon: const Icon(Icons.edit, color: Colors.orange),
                        onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (c) => ProductForm(path: widget.path, item: item)))),
                    IconButton(icon: const Icon(Icons.delete, color: Colors.red),
                        onPressed: () => _api.delete(widget.path, item['id'], auth.token).then((_) => setState(() {}))),
                  ]
                ]),
              ),
            );
          },
        );
      },
    );
  }
}

// --- CRUD FORM ---
class ProductForm extends StatefulWidget {
  final String path;
  final Map<String, dynamic>? item;
  const ProductForm({super.key, required this.path, this.item});
  @override
  State<ProductForm> createState() => _ProductFormState();
}

class _ProductFormState extends State<ProductForm> {
  final _field1 = TextEditingController();
  final _price = TextEditingController();
  final _api = ApiService();

  @override
  void initState() {
    super.initState();
    if (widget.item != null) {
      _field1.text = widget.item!['title'] ?? widget.item!['brand'] ?? widget.item!['description'];
      _price.text = widget.item!['price'].toString();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.item == null ? "Add New" : "Edit Item")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(children: [
          TextField(controller: _field1, decoration: const InputDecoration(labelText: "Name / Title")),
          TextField(controller: _price, decoration: const InputDecoration(labelText: "Price"), keyboardType: TextInputType.number),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () async {
              Map<String, dynamic> data = {
                "id": widget.item?['id'],
                "price": double.parse(_price.text),
                // Handle Polymorphic fields
                if (widget.path == 'books') "title": _field1.text,
                if (widget.path == 'laptops' || widget.path == 'phones') "brand": _field1.text,
                if (widget.path == 'tickets') "description": _field1.text,
                "productType": widget.path == 'books' ? "BookEntity" :
                widget.path == 'phones' ? "PhoneEntity" :
                widget.path == 'tickets' ? "TicketEntity" : "LaptopEntity",
              };
              await _api.save(widget.path, data, context.read<AuthProvider>().token);
              if (mounted) Navigator.pop(context);
            },
            child: const Text("SAVE CHANGES"),
          )
        ]),
      ),
    );
  }
}