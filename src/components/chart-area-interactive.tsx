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

type Trend = {
  date: string
  spam: number
  legit: number
}

interface ChartAreaInteractiveProps {
  trends: Trend[]
}

export const description = "An interactive chart showing spam detection trends"

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

export function ChartAreaInteractive({ trends }: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = trends.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date()
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
