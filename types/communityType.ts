export type categoriesData = {
  categoryPk: number,
  categoryCode: string,
  categoryName: string,
}

export type postData = {
  categoryPk: number,
  categoryName: string,
	pk: number,
	title: string,
	content: string,
	viewCount: number,
	likeCount: number,
	commentCount: number,
	imageUrl: string | null,
	writtenAt: string,
	writerNickName: string,
	writerProfileUrl: string | null,
}