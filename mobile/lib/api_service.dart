import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // Use http://10.0.2.2:8080 for Android, http://localhost:8080 for iOS
  final String baseUrl = "http://10.0.2.2:8080/api/rest";

  Map<String, String> _headers(String? token) => {
    "Content-Type": "application/json",
    if (token != null) "Authorization": "Bearer $token",
  };

  Future<http.Response> login(String email, String password) async {
    return await http.post(Uri.parse("$baseUrl/auth/login"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({"email": email, "password": password}));
  }

  Future<List<dynamic>> getAll(String path, String? token) async {
    final res = await http.get(Uri.parse("$baseUrl/$path"), headers: _headers(token));
    return jsonDecode(res.body);
  }

  Future<void> delete(String path, int id, String? token) async {
    await http.delete(Uri.parse("$baseUrl/$path/$id"), headers: _headers(token));
  }

  Future<void> save(String path, Map<String, dynamic> data, String? token) async {
    if (data['id'] != null) {
      await http.put(Uri.parse("$baseUrl/$path/${data['id']}"), headers: _headers(token), body: jsonEncode(data));
    } else {
      await http.post(Uri.parse("$baseUrl/$path"), headers: _headers(token), body: jsonEncode(data));
    }
  }

  Future<void> addToCart(int productId, String? token) async {
    await http.post(Uri.parse("$baseUrl/cart/add/$productId"), headers: _headers(token));
  }
}