import 'package:flutter/material.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';

class UicoreNavigationBar extends StatefulWidget {
  final Function(int) onTap;
  final int initialIndex;
  final Color color;
  final bool isDark;
  const UicoreNavigationBar({Key? key, required this.onTap, required this.initialIndex, required this.color, required this.isDark}) : super(key: key);

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
      height: 50.0,
      items: const <Widget>[
        Icon(Icons.video_library, size: 25),
        Icon(Icons.view_list, size: 25),
        Icon(Icons.text_snippet, size: 25),
      ],
      color: widget.isDark? const Color.fromARGB(255, 194, 194, 194) : Colors.white,
      buttonBackgroundColor: widget.isDark ? Colors.orange : const Color.fromRGBO(235, 187, 74, 1),
      backgroundColor: widget.isDark ? Colors.transparent : widget.color,
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
