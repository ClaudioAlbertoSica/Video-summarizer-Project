import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import '../../entity/resumen_list_search.dart';

final resumenNotifierProvider = StateNotifierProvider<ResumenNotifier, ResumenListSearch>((ref) => ResumenNotifier());

class ResumenNotifier extends StateNotifier<ResumenListSearch> {
  ResumenNotifier() : super(ResumenListSearch(resumenFound: []));

  void changeList(List<ResumenPreview> list) {
    state = state.copyWith(resumenFound: list);
  }

  void toggleFavourite(String idRes) {
    final updatedList = state.resumenFound.map((resumen) {
      if (resumen.idres == idRes) {
        return ResumenPreview(
          idres: resumen.idres,
          thumbnail: resumen.thumbnail,
          title: resumen.title,
          points: resumen.points,
          isFavourite: !resumen.isFavourite,
        );
      }
      return resumen;
    }).toList();

    state = state.copyWith(resumenFound: updatedList);
  }

  void changeRating(String idRes, int value) {
    final updatedList = state.resumenFound.map((resumen) {
      if (resumen.idres == idRes) {
        return ResumenPreview(
          idres: resumen.idres,
          thumbnail: resumen.thumbnail,
          title: resumen.title,
          points: value,
          isFavourite: !resumen.isFavourite,
        );
      }
      return resumen;
    }).toList();

    state = state.copyWith(resumenFound: updatedList);
  }
}
