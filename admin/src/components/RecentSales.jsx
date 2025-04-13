import { Avatar, Box, Stack, Typography } from "@mui/material"

function RecentSales() {
  const sales = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: "+$1,999.00",
      img: "/avatars/01.png",
      fallback: "OM",
    },
    {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      amount: "+$39.00",
      img: "/avatars/02.png",
      fallback: "JL",
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: "+$299.00",
      img: "/avatars/03.png",
      fallback: "IN",
    },
    {
      name: "William Kim",
      email: "will@email.com",
      amount: "+$99.00",
      img: "/avatars/04.png",
      fallback: "WK",
    },
    {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      amount: "+$39.00",
      img: "/avatars/05.png",
      fallback: "SD",
    },
  ]

  return (
    <Stack spacing={2}>
      {sales.map((sale, idx) => (
        <Stack key={idx} direction="row" alignItems="center" spacing={2}>
          <Avatar alt={sale.name} src={sale.img}>
            {sale.fallback}
          </Avatar>
          <Box flexGrow={1}>
            <Typography variant="body2" fontWeight="medium">
              {sale.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {sale.email}
            </Typography>
          </Box>
          <Typography fontWeight="medium">{sale.amount}</Typography>
        </Stack>
      ))}
    </Stack>
  )
}

export default RecentSales
