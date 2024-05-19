import 'package:resumen_mobile/entity/preview_resumen.dart';

class User {

final String userName;
final String id;
final List inventario;
final bool inProgress;
final bool isDark;

User(
    {
      required this.userName,
      required this.id,
      required this.inventario,
      required this.inProgress,
      required this.isDark,
    }
  );

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      userName: json['userName'],
      id: json['id'],
      inventario: json['inventario'],
      inProgress: json['inProgress'],
      isDark: json['isDark'],

    );
  }
}