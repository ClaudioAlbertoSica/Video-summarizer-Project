import 'package:flutter/material.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';

class UicoreNavigationBar extends StatefulWidget {
  final Function(int) onTap;
  final int initialIndex;
  const UicoreNavigationBar({Key? key, required this.onTap, required this.initialIndex}) : super(key: key);

  @override
  _UicoreNavigationBarState createState() => _UicoreNavigationBarState();
}

class _UicoreNavigationBarState extends State<UicoreNavigationBar> {
  late int _selectedIndex;

  @override
  void initState() {
    super.initState();
    _selectedIndex = widget.initialIndex;
  }

  @override
  Widget build(BuildContext context) {
    return CurvedNavigationBar(
      index: _selectedIndex,
      height: 60.0,
      items: const <Widget>[
        Icon(Icons.video_library, size: 30),
        Icon(Icons.view_list, size: 30),
        Icon(Icons.text_snippet, size: 30),
      ],
      color: const Color.fromARGB(255, 194, 194, 194),
      buttonBackgroundColor: Colors.orange,
      backgroundColor: Colors.transparent,
      animationCurve: Curves.easeInOut,
      animationDuration: const Duration(milliseconds: 100),
      onTap: (index) {
        setState(() {
          _selectedIndex = index;
        });
        widget.onTap(index);
      },
    );
  }
}
