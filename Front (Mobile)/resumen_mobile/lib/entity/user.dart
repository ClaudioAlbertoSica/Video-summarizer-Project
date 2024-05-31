import 'package:flutter/material.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';

class User {

final String userName;
final String id;
final List<ResumenPreview> inventario;
final bool inProgress;
final bool isDark;
final bool provisoria;

User(
    {
      this.userName = "",
      this.id = "" ,
      this.inventario = const [],
      this.inProgress = false,
      this.isDark = false,
      this.provisoria = false
    }
  );

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      userName: json['userName'],
      id: json['id'],
      inventario: json['inventario'],
      inProgress: json['inProgress'],
      isDark: json['isDark'],
      provisoria: json['provisoria']

    );
  }

  User getUser() {
    return User(
      userName: userName,
      id: id,
      inventario: inventario,
      inProgress: inProgress,
      isDark: isDark,
      provisoria: provisoria,
      );
  }

  User copyWith({bool?isDark, User? userLog, bool? inProgress}) {
    return userLog ?? User(
      userName: userName,
      id: id,
      inventario: inventario,
      inProgress: inProgress ?? this.inProgress,
      isDark: isDark ?? this.isDark,
      provisoria: provisoria
    );
  }

ThemeData getTheme() {
    return ThemeData(
      colorSchemeSeed: Colors.orange,
      brightness: isDark ? Brightness.dark : Brightness.light,
    );
  }

  ResumenPreview getResumen(String idres){
    ResumenPreview resumen = ResumenPreview(idres: '', title: 'title', points: 0, isFavourite: false);
    for (var r in inventario) {
      if(r.idres == idres){
        resumen = r;
      }
    }
    return resumen;
  }
}
