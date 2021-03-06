// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {categoryData} from '../../../types/communityType'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<categoryData[]>
) {
  res.status(200).json(CATEGORIES)
}

const CATEGORIES: categoryData[] = [
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