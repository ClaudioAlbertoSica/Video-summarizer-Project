import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/presentation/screen/account_screeen.dart';
import 'package:resumen_mobile/presentation/screen/config_screen.dart';
import 'package:resumen_mobile/presentation/screen/faqs_screen.dart';
import 'package:resumen_mobile/presentation/screen/report_screen.dart';

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
            decoration: const BoxDecoration(
              color: Color.fromARGB(255, 245, 248, 251),
            ),
            child: Image.asset(
              'assets/images/WriterRabbitLogo.png',
              height: 5,
            ),
          ),
          ListTile(
            title: const Text('Config'),
            onTap: () {
              context.pushNamed(ConfigScreen.name);
              // Navega a la pantalla de configuración
              // Reemplaza con la navegación adecuada
            },
          ),
          ListTile(
            title: const Text('Account'),
            onTap: () {
              context.pushNamed(AcconutScreen.name, extra: const SizedBox(height: 0.0,));
              // Navega a la pantalla de cuenta
              // Reemplaza con la navegación adecuada
            },
          ),
          const Divider(),
          ListTile(
            title: const Text('FAQs'),
            onTap: () {
              context.pushNamed(FAQScreen.name);
              // Navega a la pantalla de cuenta
              // Reemplaza con la navegación adecuada
            },
          ),
          ListTile(
            title: const Text('Report'),
            onTap: () {
              context.pushNamed(ReportScreen.name);
              // Navega a la pantalla de cuenta
              // Reemplaza con la navegación adecuada
            },
          ),
        ],
      ),
    );
  }
}
