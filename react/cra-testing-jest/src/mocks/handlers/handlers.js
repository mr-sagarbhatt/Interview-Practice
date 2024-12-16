import { rest } from 'msw'

export const handlers = [
  rest.post(`http://localhost:3005/addcomment`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: Date.now(),
        text: req.body.text,
      }),
    )
  }),
]

// Before: rest.get('/resource', (req, res, ctx) => {})
// After: http.get('/resource', (info) => {})

// import { http, HttpResponse } from 'msw'

// export const handlers = [
//   http.post(`http://localhost:3000/addcomment`, async ({ request }) => {
//     // * Read the request body as JSON.
//     const body = await request.json()
//     return HttpResponse.json(
//       {
//         id: Date.now(),
//         text: body.text,
//       },
//       { status: 200 },
//     )
//   }),
// ]
