import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import '../../entity/resumen_list_search.dart';

//final Provider<List<ResumenPreview>> resumenListProvider = Provider((ref) => resumenList);
final resumenNotifierProvider = StateNotifierProvider<ResumenNotifier, ResumenListSearch>((ref) => ResumenNotifier());

class ResumenNotifier extends StateNotifier<ResumenListSearch> {
  ResumenNotifier() : super(ResumenListSearch(resumenFound: []));

  void changeList(List<ResumenPreview>list) {
    state = state.copyWith(resumenFound: list);
  }
}
