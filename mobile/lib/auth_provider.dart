import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthProvider extends ChangeNotifier {
  String? _token;
  List<String> _roles = [];
  final _storage = const FlutterSecureStorage();

  String? get token => _token;
  bool get isAdmin => _roles.contains("ROLE_ADMIN");
  bool get isAuthenticated => _token != null;

  Future<void> setToken(String? newToken) async {
    _token = newToken;
    if (newToken != null) {
      await _storage.write(key: 'token', value: newToken);
      _roles = _getRolesFromToken(newToken);
    } else {
      await _storage.delete(key: 'token');
      _roles = [];
    }
    notifyListeners();
  }

  List<String> _getRolesFromToken(String t) {
    try {
      final parts = t.split('.');
      if (parts.length != 3) return [];
      final payload = utf8.decode(base64Url.decode(base64Url.normalize(parts[1])));
      final Map<String, dynamic> data = jsonDecode(payload);
      return List<String>.from(data['roles'] ?? []);
    } catch (e) {
      return [];
    }
  }

  Future<void> tryAutoLogin() async {
    String? storedToken = await _storage.read(key: 'token');
    if (storedToken != null) {
      await setToken(storedToken);
    }
  }
}