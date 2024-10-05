import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CardContentProps {
  title: string
  description: string
}

const cardContent: CardContentProps = {
  title: "Lorem ipsum dolor",
  description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, hic ipsum! Qui dicta debitis aliquid quo molestias explicabo iure!",
}

const CornerIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    strokeWidth="2"
    stroke="currentColor"
    {...props}
    className={cn("text-primary size-6 absolute", className)}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
)

export default function FuturisticCard({ className, content = cardContent }: { className?: string, content?: CardContentProps }) {
  return (
    <Card className={cn(
      "relative border-dashed border-zinc-700 dark:border-zinc-700",
      "rounded-none", // Remove default border radius
      className
    )}>
      <CornerIcon className="-top-3 -left-3" />
      <CornerIcon className="-top-3 -right-3" />
      <CornerIcon className="-bottom-3 -left-3" />
      <CornerIcon className="-bottom-3 -right-3" />
      <CardHeader>
        <CardTitle className="text-lg font-bold mb-1">{content.title}</CardTitle>
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>
    </Card>
  )
}