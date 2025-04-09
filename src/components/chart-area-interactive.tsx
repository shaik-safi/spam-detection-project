"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

// Change chart description
export const description = "An interactive chart showing spam detection trends"

const chartData = [
  { date: "2024-04-01", spam: 222, legit: 150 },
  { date: "2024-04-02", spam: 97, legit: 180 },
  { date: "2024-04-03", spam: 167, legit: 120 },
  { date: "2024-04-04", spam: 242, legit: 260 },
  { date: "2024-04-05", spam: 373, legit: 290 },
  { date: "2024-04-06", spam: 301, legit: 340 },
  { date: "2024-04-07", spam: 245, legit: 180 },
  { date: "2024-04-08", spam: 409, legit: 320 },
  { date: "2024-04-09", spam: 59, legit: 110 },
  { date: "2024-04-10", spam: 261, legit: 190 },
  { date: "2024-04-11", spam: 327, legit: 350 },
  { date: "2024-04-12", spam: 292, legit: 210 },
  { date: "2024-04-13", spam: 342, legit: 380 },
  { date: "2024-04-14", spam: 137, legit: 220 },
  { date: "2024-04-15", spam: 120, legit: 170 },
  { date: "2024-04-16", spam: 138, legit: 190 },
  { date: "2024-04-17", spam: 446, legit: 360 },
  { date: "2024-04-18", spam: 364, legit: 410 },
  { date: "2024-04-19", spam: 243, legit: 180 },
  { date: "2024-04-20", spam: 89, legit: 150 },
  { date: "2024-04-21", spam: 137, legit: 200 },
  { date: "2024-04-22", spam: 224, legit: 170 },
  { date: "2024-04-23", spam: 138, legit: 230 },
  { date: "2024-04-24", spam: 387, legit: 290 },
  { date: "2024-04-25", spam: 215, legit: 250 },
  { date: "2024-04-26", spam: 75, legit: 130 },
  { date: "2024-04-27", spam: 383, legit: 420 },
  { date: "2024-04-28", spam: 122, legit: 180 },
  { date: "2024-04-29", spam: 315, legit: 240 },
  { date: "2024-04-30", spam: 454, legit: 380 },
  { date: "2024-05-01", spam: 165, legit: 220 },
  { date: "2024-05-02", spam: 293, legit: 310 },
  { date: "2024-05-03", spam: 247, legit: 190 },
  { date: "2024-05-04", spam: 385, legit: 420 },
  { date: "2024-05-05", spam: 481, legit: 390 },
  { date: "2024-05-06", spam: 498, legit: 520 },
  { date: "2024-05-07", spam: 388, legit: 300 },
  { date: "2024-05-08", spam: 149, legit: 210 },
  { date: "2024-05-09", spam: 227, legit: 180 },
  { date: "2024-05-10", spam: 293, legit: 330 },
  { date: "2024-05-11", spam: 335, legit: 270 },
  { date: "2024-05-12", spam: 197, legit: 240 },
  { date: "2024-05-13", spam: 197, legit: 160 },
  { date: "2024-05-14", spam: 448, legit: 490 },
  { date: "2024-05-15", spam: 473, legit: 380 },
  { date: "2024-05-16", spam: 338, legit: 400 },
  { date: "2024-05-17", spam: 499, legit: 420 },
  { date: "2024-05-18", spam: 315, legit: 350 },
  { date: "2024-05-19", spam: 235, legit: 180 },
  { date: "2024-05-20", spam: 177, legit: 230 },
  { date: "2024-05-21", spam: 82, legit: 140 },
  { date: "2024-05-22", spam: 81, legit: 120 },
  { date: "2024-05-23", spam: 252, legit: 290 },
  { date: "2024-05-24", spam: 294, legit: 220 },
  { date: "2024-05-25", spam: 201, legit: 250 },
  { date: "2024-05-26", spam: 213, legit: 170 },
  { date: "2024-05-27", spam: 420, legit: 460 },
  { date: "2024-05-28", spam: 233, legit: 190 },
  { date: "2024-05-29", spam: 78, legit: 130 },
  { date: "2024-05-30", spam: 340, legit: 280 },
  { date: "2024-05-31", spam: 178, legit: 230 },
  { date: "2024-06-01", spam: 178, legit: 200 },
  { date: "2024-06-02", spam: 470, legit: 410 },
  { date: "2024-06-03", spam: 103, legit: 160 },
  { date: "2024-06-04", spam: 439, legit: 380 },
  { date: "2024-06-05", spam: 88, legit: 140 },
  { date: "2024-06-06", spam: 294, legit: 250 },
  { date: "2024-06-07", spam: 323, legit: 370 },
  { date: "2024-06-08", spam: 385, legit: 320 },
  { date: "2024-06-09", spam: 438, legit: 480 },
  { date: "2024-06-10", spam: 155, legit: 200 },
  { date: "2024-06-11", spam: 92, legit: 150 },
  { date: "2024-06-12", spam: 492, legit: 420 },
  { date: "2024-06-13", spam: 81, legit: 130 },
  { date: "2024-06-14", spam: 426, legit: 380 },
  { date: "2024-06-15", spam: 307, legit: 350 },
  { date: "2024-06-16", spam: 371, legit: 310 },
  { date: "2024-06-17", spam: 475, legit: 520 },
  { date: "2024-06-18", spam: 107, legit: 170 },
  { date: "2024-06-19", spam: 341, legit: 290 },
  { date: "2024-06-20", spam: 408, legit: 450 },
  { date: "2024-06-21", spam: 169, legit: 210 },
  { date: "2024-06-22", spam: 317, legit: 270 },
  { date: "2024-06-23", spam: 480, legit: 530 },
  { date: "2024-06-24", spam: 132, legit: 180 },
  { date: "2024-06-25", spam: 141, legit: 190 },
  { date: "2024-06-26", spam: 434, legit: 380 },
  { date: "2024-06-27", spam: 448, legit: 490 },
  { date: "2024-06-28", spam: 149, legit: 200 },
  { date: "2024-06-29", spam: 103, legit: 160 },
  { date: "2024-06-30", spam: 446, legit: 400 },
]

const chartConfig = {
  spam: {
    label: "Spam",
    color: "hsl(0, 100%, 60%)",
  },
  legit: {
    label: "Legit",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Spam Detection</CardTitle>
        <CardDescription>
    {timeRange === "90d" && (
      <>
        <span className="hidden @[540px]/card:block">Spam trends over the past 3 months</span>
        <span className="@[540px]/card:hidden">Last 3 months</span>
      </>
    )}
    {timeRange === "30d" && (
      <>
        <span className="hidden @[540px]/card:block">Spam trends over the past 30 days</span>
        <span className="@[540px]/card:hidden">Last 30 days</span>
      </>
    )}
    {timeRange === "7d" && (
      <>
        <span className="hidden @[540px]/card:block">Spam trends over the past 7 days</span>
        <span className="@[540px]/card:hidden">Last 7 days</span>
      </>
    )}
  </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSpam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-spam)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-spam)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillLegit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-legit)" stopOpacity={0.5} />
                <stop offset="95%" stopColor="var(--color-legit)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="spam"
              type="natural"
              fill="url(#fillSpam)"
              stroke="var(--color-spam)"
              stackId="a"
            />
            <Area
              dataKey="legit"
              type="natural"
              fill="url(#fillLegit)"
              stroke="var(--color-legit)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}