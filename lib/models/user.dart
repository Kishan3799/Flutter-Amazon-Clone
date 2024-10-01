import 'dart:convert';

// ignore_for_file: public_member_api_docs, sort_constructors_first
class User {
  final String id;
  final String name;
  final String type;
  final String email;
  final String password;
  final String address;
  final String token;
  final List<dynamic> cart;

  User({
    required this.id,
    required this.name,
    required this.type,
    required this.email,
    required this.password,
    required this.address,
    required this.token,
    required this.cart,
  });


  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'name': name,
      'type': type,
      'email': email,
      'password': password,
      'address': address,
      'token': token,
      'cart':cart,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['_id'] as String,
      name: map['name'] as String,
      type: map['type'] as String,
      email: map['email'] as String,
      password: map['password'] as String,
      address: map['address'] as String,
      token: map['token'] as String,
      cart: List<Map<String, dynamic>>.from(
        map['cart']?.map(
          (x) => Map<String, dynamic>.from(x)
          ),
        ),
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) => User.fromMap(json.decode(source) as Map<String, dynamic>);

  User copyWith({
    String? id,
    String? name,
    String? type,
    String? email,
    String? password,
    String? address,
    String? token,
    List<dynamic>? cart,
  }) {
    return User(
      id: id ?? this.id,
      name: name ?? this.name,
      type: type ?? this.type,
      email: email ?? this.email,
      password: password ?? this.password,
      address: address ?? this.address,
      token: token ?? this.token,
      cart: cart ?? this.cart,
    );
  }
}
