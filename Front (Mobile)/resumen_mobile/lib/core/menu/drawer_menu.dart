
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/presentation/screen/account_screeen.dart';
import 'package:resumen_mobile/presentation/screen/config_screen.dart';

class DrawerMenu extends StatefulWidget {
  const DrawerMenu({
    super.key,
  });

  @override
  State<DrawerMenu> createState() => _DrawerMenuState();
}

class _DrawerMenuState extends State<DrawerMenu> {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            child: Image.asset(
              'assets/images/WriterRabbitLogo.png',
              height: 5,
            ),
            decoration: BoxDecoration(
              color: const Color.fromARGB(255, 245, 248, 251),
            ),
          ),
          ListTile(
            title: Text('Config'),
            onTap: () {
              context.pushNamed(ConfigScreen.name);
              // Navega a la pantalla de configuración
              // Reemplaza con la navegación adecuada
            },
          ),
          ListTile(
            title: Text('Account'),
            onTap: () {
              context.pushNamed(AcconutScreen.name);
              // Navega a la pantalla de cuenta
              // Reemplaza con la navegación adecuada
            },
          ),
        ],
      ),
    );
  }
}
