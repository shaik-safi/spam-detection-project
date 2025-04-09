import { IconTrendingUp, IconMessage, IconCheck, IconX } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

      {/* Total Messages */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Messages</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4,560
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconMessage className="size-4 mr-1" />
              All Received
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="font-medium">Includes both spam and ham</div>
          <div className="text-muted-foreground">All time records</div>
        </CardFooter>
      </Card>

      {/* Spam Messages */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Spam Messages</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,230
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconX className="size-4 mr-1" />
              27% Spam
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="font-medium">Identified as Spam</div>
          <div className="text-muted-foreground">Filtered by ML models</div>
        </CardFooter>
      </Card>

      {/* Ham Messages */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ham Messages</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            3,330
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCheck className="size-4 mr-1" />
              73% Ham
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="font-medium">Safe & Legitimate</div>
          <div className="text-muted-foreground">No spam detected</div>
        </CardFooter>
      </Card>

      {/* Accuracy (Static for now) */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Model Accuracy</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            94.2%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp className="size-4 mr-1" />
              Consistent
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="font-medium">Avg of 3 ML models</div>
          <div className="text-muted-foreground">F1-score or custom metric</div>
        </CardFooter>
      </Card>

    </div>
  )
}
