import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class DrawMenu extends StatefulWidget {
  const DrawMenu({super.key});

  @override
  State<DrawMenu> createState() => _DrawMenuState();
}

class _DrawMenuState extends State<DrawMenu> {
int selectedScreen = 0;
  @override
  Widget build(BuildContext context) {
    return NavigationDrawer(
      selectedIndex: selectedScreen,
      onDestinationSelected: (value) {
        selectedScreen = value;
        setState(() {});
        context.push(menuItems[value].link);
      },
      children: [
        ...menuItems
        .sublist(0,3)
        .map((item) => NavigationDrawerDestination(
            icon: Icon(item.icon), 
            label: Text(item.title)
            )
          )
        .toList(),
        Divider(),
      ],
    );
  }
}
