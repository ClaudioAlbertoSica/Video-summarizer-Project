import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/entity/app_theme.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:resumen_mobile/presentation/providers/theme_provider.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';

class User {

final String userName;
final String id;
final List<ResumenPreview> inventario;
final bool inProgress;
final bool isDark;

User(
    {
      this.userName = "",
      this.id = "" ,
      this.inventario = const [],
      this.inProgress = false,
      this.isDark = false,
      
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

  User getUser() {
    return User(
      userName: userName,
      id: id,
      inventario: inventario,
      inProgress: inProgress,
      isDark: isDark,
      );
  }

  User copyWith({bool?isDark, User? userLog}) {
    return userLog ?? User(
      userName: userName,
      id: id,
      inventario: inventario,
      inProgress: inProgress,
      isDark: isDark ?? this.isDark,
    );
  }

ThemeData getTheme() {
    return ThemeData(
      brightness: isDark ? Brightness.dark : Brightness.light,
    );
  }
}
