// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type categoriesData = {
  categoryPk: number,
  categoryCode: string,
  categoryName: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<categoriesData[]>
) {
  res.status(200).json(CATEGORIES)
}

const CATEGORIES: categoriesData[] = [
	{
		categoryPk: 1,
		categoryCode: 'PETITION',
		categoryName: '대선청원'
	},
	{
		categoryPk: 2,
		categoryCode: 'FREE',
		categoryName: '자유글'
	},
	{
		categoryPk: 3,
		categoryCode: 'QNA',
		categoryName: '질문/답변'
	},
	{
		categoryPk: 4,
		categoryCode: 'NEWS',
		categoryName: '뉴스'
	},
	{
		categoryPk: 5,
		categoryCode: 'TIP',
		categoryName: '노하우'
	}
]