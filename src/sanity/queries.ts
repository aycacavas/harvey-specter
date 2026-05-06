import { defineQuery } from 'groq'

export const portfolioQuery = defineQuery(
  `*[_type == "portfolio"] | order(order asc) {
    _id,
    title,
    slug,
    tags,
    coverImage,
    order
  }`
)
