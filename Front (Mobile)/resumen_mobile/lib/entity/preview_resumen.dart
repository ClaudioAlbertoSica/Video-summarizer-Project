class ResumenPreview {
  final String idres;
  final String? thumbnail;
  final String title;
  final int points;
  final bool isFavourite;

  ResumenPreview(
    {
      required this.idres,
      this.thumbnail,
      required this.title,
      required this.points,
      required this.isFavourite,
    }
  );

  factory ResumenPreview.fromJson(Map<String, dynamic> json) {
    return ResumenPreview(
      idres: json['idres'],
      thumbnail: json['thumbnail'],
      title: json['title'],
      points: json['points'],
      isFavourite: json['isFavourite']
    );
  }
}
