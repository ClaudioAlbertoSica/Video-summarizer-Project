import 'package:flutter/material.dart';

class OurAppBar extends StatelessWidget implements PreferredSizeWidget {
  OurAppBar({
    Key? key,
    this.title,
    this.backgroundColor = Colors.transparent,
    this.leadingIconColor = const Color.fromARGB(255, 249, 249, 249),
  }) : preferredSize = const Size.fromHeight(kToolbarHeight),
      super(key: key);

  final Widget? title;
  final Color backgroundColor;
  final Color leadingIconColor;

  @override
  final Size preferredSize;

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: backgroundColor,
      centerTitle: true,
      title: title,
      elevation: 0,
      leading: GestureDetector(
        child: Icon(
          Icons.arrow_back_ios,
          color: leadingIconColor,
        ),
        onTap: () {
          Navigator.pop(context);
        },
      ),
    );
  }
}
