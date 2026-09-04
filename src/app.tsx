import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { Bell, Check, Command as CommandIcon, Moon, MoreHorizontal, Sun } from "lucide-react"
import { toast } from "sonner"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Toaster } from "@/components/ui/sonner"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

function App() {
  const { theme, setTheme } = useTheme()
  const [commandOpen, setCommandOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setCommandOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", onKeyDown, true)
    return () => document.removeEventListener("keydown", onKeyDown, true)
  }, [])

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <div>
              <p className="text-sm font-semibold">Relay UI</p>
              <p className="text-xs text-muted-foreground">React component starter</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setCommandOpen(true)}>
                <CommandIcon aria-hidden="true" />
                Commands
                <span className="hidden text-xs text-muted-foreground sm:inline">⌘K</span>
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle theme</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
          <section className="space-y-2">
            <Badge variant="outline">Editable source</Badge>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Build with the Relay visual system.</h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Semantic tokens, accessible Radix primitives, compact controls, and dark and light themes ready to customize.
            </p>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Actions and status</CardTitle>
                <CardDescription>Shared variants keep product surfaces consistent.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Delete</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>Active</Badge>
                  <Badge variant="secondary">Draft</Badge>
                  <Badge variant="outline">Review</Badge>
                  <Badge variant="destructive">Blocked</Badge>
                </div>
              </CardContent>
              <CardFooter className="justify-between border-t pt-6">
                <span className="text-xs text-muted-foreground">Compact by default</span>
                <Button variant="link" className="px-0">View tokens</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form controls</CardTitle>
                <CardDescription>Labels, inputs, selection, and feedback share one rhythm.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project name</Label>
                  <Input id="project-name" placeholder="New workspace" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-stage">Stage</Label>
                  <Select defaultValue="design">
                    <SelectTrigger id="project-stage">
                      <SelectValue placeholder="Choose a stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="build">Build</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-note">Note</Label>
                  <Textarea id="project-note" placeholder="What should the team know?" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex-row items-start justify-between space-y-0">
                <div className="space-y-1.5">
                  <CardTitle>Overlays and feedback</CardTitle>
                  <CardDescription>Keyboard-ready menus, dialogs, sheets, and toasts.</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open card menu">
                      <MoreHorizontal aria-hidden="true" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit<DropdownMenuShortcut>⌘E</DropdownMenuShortcut></DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Dialog>
                  <DialogTrigger asChild><Button variant="outline">Open dialog</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create a workspace?</DialogTitle>
                      <DialogDescription>This demonstrates the shared modal surface and focus handling.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button onClick={() => toast.success("Workspace created")}>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Sheet>
                  <SheetTrigger asChild><Button variant="outline">Open sheet</Button></SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Details</SheetTitle>
                      <SheetDescription>Use sheets for secondary workflows without leaving context.</SheetDescription>
                    </SheetHeader>
                    <div className="py-6 text-sm text-muted-foreground">Your product content goes here.</div>
                    <SheetFooter><Button>Save changes</Button></SheetFooter>
                  </SheetContent>
                </Sheet>
                <Button variant="outline" onClick={() => toast("Notification sent", { description: "Sonner uses the same semantic tokens." })}>
                  <Bell aria-hidden="true" /> Toast
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disclosure and loading</CardTitle>
                <CardDescription>Calm hierarchy for dense application screens.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="tokens">
                    <AccordionTrigger>Where are colors customized?</AccordionTrigger>
                    <AccordionContent>Change semantic variables in src/index.css. Components need no migration.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="components">
                    <AccordionTrigger>Can components be edited?</AccordionTrigger>
                    <AccordionContent>Yes. They are application source, following the shadcn ownership model.</AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="space-y-3 rounded-lg border bg-secondary/25 p-4" aria-label="Loading preview">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
          <CommandInput placeholder="Type a command…" />
          <CommandList>
            <CommandEmpty>No commands found.</CommandEmpty>
            <CommandGroup heading="Starter">
              <CommandItem onSelect={() => setCommandOpen(false)}><Check aria-hidden="true" />Create project<CommandShortcut>⌘N</CommandShortcut></CommandItem>
              <CommandItem
                onSelect={() => {
                  setCommandOpen(false)
                  setTheme(theme === "dark" ? "light" : "dark")
                }}
              >
                <Sun aria-hidden="true" />
                Toggle theme
                <CommandShortcut>⌘T</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
        <Toaster />
      </div>
    </TooltipProvider>
  )
}

export default App
