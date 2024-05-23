import 'package:flutter/material.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import '../presentation/uicoreStyles/uicore_book_button.dart';

class ResumenListSearch {
  final List<ResumenPreview> resumenFound;

  ResumenListSearch({
    required this.resumenFound,
  });

  ListView getResumenFound() {
    return ListView.builder(
      itemCount: resumenFound.length,
      itemBuilder: (context, index) {
        final resumen = resumenFound[index];
        return Padding(
          padding: const EdgeInsets.all(7.0),
          child: BookButton(resumen: resumen),
        );
      },
    );
  }

  ResumenListSearch copyWith({List<ResumenPreview> ? resumenFound}) {
    return ResumenListSearch(
      resumenFound: resumenFound ?? this.resumenFound
    );
  }
}
