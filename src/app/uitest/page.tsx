import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function TypographyDemo() {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-atkinson">
        The Joke Tax Chronicles
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6 font-atkinson">
        Once upon a time, in a far-off land, there was a very lazy king who
        spent all day lounging on his throne. One day, his advisors came to him
        with a problem: the kingdom was running out of money.
      </p>
      <h2 className="mt-10 font-atkinson scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        The King's Plan
      </h2>
      <p className="leading-7 font-atkinson [&:not(:first-child)]:mt-6">
        The king thought long and hard, and finally came up with{" "}
        <a
          href="#"
          className="font-medium font-atkinson text-primary underline underline-offset-4"
        >
          a brilliant plan
        </a>
        : he would tax the jokes in the kingdom.
      </p>
      <blockquote className="font-atkinson mt-6 border-l-2 pl-6 italic">
        "After all," he said, "everyone enjoys a good joke, so it's only fair
        that they should pay for the privilege."
      </blockquote>
      <h3 className="font-atkinson mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        The Joke Tax
      </h3>
      <p className="font-atkinson leading-7 [&:not(:first-child)]:mt-6">
        The king's subjects were not amused. They grumbled and complained, but
        the king was firm:
      </p>
      <ul className="font-atkinson my-6 ml-6 list-disc [&>li]:mt-2">
        <li>1st level of puns: 5 gold coins</li>
        <li>2nd level of jokes: 10 gold coins</li>
        <li>3rd level of one-liners : 20 gold coins</li>
      </ul>
      <p className="font-atkinson leading-7 [&:not(:first-child)]:mt-6">
        As a result, people stopped telling jokes, and the kingdom fell into a
        gloom. But there was one person who refused to let the king's
        foolishness get him down: a court jester named Jokester.
      </p>
      <h3 className="font-atkinson mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Jokester's Revolt
      </h3>
      <p className="font-atkinson leading-7 [&:not(:first-child)]:mt-6">
        Jokester began sneaking into the castle in the middle of the night and
        leaving jokes all over the place: under the king's pillow, in his soup,
        even in the royal toilet. The king was furious, but he couldn't seem to
        stop Jokester.
      </p>
      <p className="font-atkinson leading-7 [&:not(:first-child)]:mt-6">
        And then, one day, the people of the kingdom discovered that the jokes
        left by Jokester were so funny that they couldn't help but laugh. And
        once they started laughing, they couldn't stop.
      </p>
      <h3 className="font-atkinson mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        The People's Rebellion
      </h3>
      <p className="font-atkinson leading-7 [&:not(:first-child)]:mt-6">
        The people of the kingdom, feeling uplifted by the laughter, started to
        tell jokes and puns again, and soon the entire kingdom was in on the
        joke.
      </p>
      <div className="font-atkinson my-6 w-full overflow-y-auto">
        <table className="font-atkinson w-full">
          <thead>
            <tr className="font-atkinson m-0 border-t p-0 even:bg-muted">
              <th className="font-atkinson border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                King's Treasury
              </th>
              <th className="font-atkinson border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                People's happiness
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="font-atkinson m-0 border-t p-0 even:bg-muted">
              <td className="font-atkinson border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Empty
              </td>
              <td className="font-atkinson border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Overflowing
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="font-atkinson border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Modest
              </td>
              <td className="font-atkinson border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Satisfied
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="font-atkinson border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Full
              </td>
              <td className="font-atkinson border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Ecstatic
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        The king, seeing how much happier his subjects were, realized the error
        of his ways and repealed the joke tax. Jokester was declared a hero, and
        the kingdom lived happily ever after.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        The moral of the story is: never underestimate the power of a good laugh
        and always be careful of bad ideas.
      </p>
    </div>
  )
}

export default function UITestPage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold mb-4">UI Component Test Page</h1>

      <section className="border rounded-lg p-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4 font-atkinson">Typography</h2>
        <div className="space-y-2">
          <p className="text-4xl font-atkinson font-bold">Heading 1</p>
          <p className="text-3xl font-atkinson font-bold">Heading 2</p>
          <p className="text-2xl font-atkinson">Heading 3</p>
          <p className="text-xl font-atkinson">Heading 4</p>
          <p className="text-lg font-atkinson">Large Text</p>
          <p className="font-atkinson">Normal Text</p>
          <p className="text-sm font-atkinson">Small Text</p>
          <p className="text-xs font-atkinson">Extra Small Text</p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 font-atkinson">Typography Demo</h3>
          <TypographyDemo />
        </div>
      </section>

      <section className="border rounded-lg p-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4 font-atkinson">Buttons</h2>
        <div className="space-x-2 font-atkinson">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section className="border rounded-lg p-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2">Card Title</h3>
            <p>This is a basic card component.</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2">Card Title</h3>
            <p>This is another card component.</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2">Card Title</h3>
            <p>This is a third card component.</p>
          </Card>
        </div>
      </section>

      <section className="border rounded-lg p-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Form Elements</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Enter your password" />
          </div>
          <Button>Submit</Button>
        </div>
      </section>

      <section className="border rounded-lg p-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Tabs</h2>
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content for Tab 1</TabsContent>
          <TabsContent value="tab2">Content for Tab 2</TabsContent>
          <TabsContent value="tab3">Content for Tab 3</TabsContent>
        </Tabs>
      </section>
    </div>
  )
}