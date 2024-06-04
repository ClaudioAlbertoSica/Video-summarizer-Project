import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/presentation/screen/account_screeen.dart';
import 'package:resumen_mobile/presentation/screen/config_screen.dart';
import 'package:resumen_mobile/presentation/screen/faqs_screen.dart';
import 'package:resumen_mobile/presentation/screen/login_screen.dart';
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
            title: const Text('Configuración'),
            onTap: () {
              context.pushNamed(ConfigScreen.name);
            },
          ),
          ListTile(
            title: const Text('Mi cuenta'),
            onTap: () {
              context.pushNamed(AcconutScreen.name, extra: const SizedBox(height: 0.0,));
            },
          ),
          const Divider(),
          ListTile(
            title: const Text('Preguntas Frecuentes'),
            onTap: () {
              context.pushNamed(FAQScreen.name);
            },
          ),
          ListTile(
            title: const Text('Enviar un reporte'),
            onTap: () {
              context.pushNamed(ReportScreen.name);
            },
          ),
          ListTile(
            title: const Text('Desloguearse'),
            onTap: () {
              context.goNamed(LoginScreen.name);
            },
          ),
        ],
      ),
    );
  }
}
