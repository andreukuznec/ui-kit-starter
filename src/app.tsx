import { lazy, Suspense, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { useTheme } from "@/components/theme-provider"
import {
  Bell,
  CalendarIcon,
  Check,
  Command as CommandIcon,
  Moon,
  MoreHorizontal,
  Sun,
} from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const ChartsCard = lazy(() => import("@/components/charts-card"))

const workstreams = [
  { name: "Design tokens", status: "Active", variant: "default", owner: "Ana" },
  { name: "Docs migration", status: "Draft", variant: "secondary", owner: "Marc" },
  { name: "API review", status: "Review", variant: "outline", owner: "Yuki" },
  { name: "Legacy cleanup", status: "Blocked", variant: "destructive", owner: "Sam" },
] as const

const formSchema = z.object({
  name: z.string().min(3, "Give the project at least 3 characters."),
  stage: z.string(),
  dueDate: z.date().optional(),
  note: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

function App() {
  const { theme, setTheme } = useTheme()
  const [commandOpen, setCommandOpen] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", stage: "design", note: "" },
  })

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

  function onSubmit(values: FormValues) {
    toast.success("Project created", {
      description: `${values.name} · ${values.stage}${values.dueDate ? ` · due ${format(values.dueDate, "PP")}` : ""}`,
    })
    form.reset({ name: "", stage: values.stage, note: "" })
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <div>
                  <p className="text-sm font-semibold">Relay UI</p>
                  <p className="text-xs text-muted-foreground">React component starter</p>
                </div>
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

          <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
            <section className="space-y-2">
              <Badge variant="outline">Editable source</Badge>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Build with the Relay visual system.
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                Semantic tokens, accessible Radix primitives, compact controls, and dark and light
                themes ready to customize.
              </p>
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Actions and status</CardTitle>
                  <CardDescription>
                    Shared variants keep product surfaces consistent.
                  </CardDescription>
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
                  <Button variant="link" className="px-0">
                    View tokens
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Forms and validation</CardTitle>
                  <CardDescription>
                    React Hook Form and Zod wired into the shared controls.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project name</FormLabel>
                            <FormControl>
                              <Input placeholder="New workspace" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="stage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stage</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose a stage" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="design">Design</SelectItem>
                                  <SelectItem value="build">Build</SelectItem>
                                  <SelectItem value="review">Review</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dueDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Due date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                      )}
                                    >
                                      <CalendarIcon aria-hidden="true" />
                                      {field.value ? format(field.value, "PP") : "Pick a date"}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Note</FormLabel>
                            <FormControl>
                              <Textarea placeholder="What should the team know?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end">
                        <Button type="submit">Create project</Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex-row items-start justify-between space-y-0">
                  <div className="space-y-1.5">
                    <CardTitle>Overlays and feedback</CardTitle>
                    <CardDescription>
                      Keyboard-ready menus, dialogs, sheets, and toasts.
                    </CardDescription>
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
                      <DropdownMenuItem>
                        Edit<DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Open dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create a workspace?</DialogTitle>
                        <DialogDescription>
                          This demonstrates the shared modal surface and focus handling.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => toast.success("Workspace created")}>Confirm</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open sheet</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Details</SheetTitle>
                        <SheetDescription>
                          Use sheets for secondary workflows without leaving context.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-6 text-sm text-muted-foreground">
                        Your product content goes here.
                      </div>
                      <SheetFooter>
                        <Button>Save changes</Button>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast("Notification sent", {
                        description: "Sonner uses the same semantic tokens.",
                      })
                    }
                  >
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
                      <AccordionContent>
                        Change semantic variables in src/index.css. Components need no migration.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="components">
                      <AccordionTrigger>Can components be edited?</AccordionTrigger>
                      <AccordionContent>
                        Yes. They are application source, following the shadcn ownership model.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div
                    className="space-y-3 rounded-lg border bg-secondary/25 p-4"
                    role="group"
                    aria-label="Loading preview"
                  >
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                  </div>
                </CardContent>
              </Card>

              <Suspense
                fallback={
                  <Card>
                    <CardHeader>
                      <CardTitle>Charts</CardTitle>
                      <CardDescription>Loading chart…</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-52 w-full" />
                    </CardContent>
                  </Card>
                }
              >
                <ChartsCard />
              </Suspense>

              <Card>
                <CardHeader>
                  <CardTitle>Data table</CardTitle>
                  <CardDescription>Semantic table primitives with status badges.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Workstream</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Owner</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {workstreams.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell className="font-medium">{row.name}</TableCell>
                          <TableCell>
                            <Badge variant={row.variant}>{row.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{row.owner}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>

          <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
            <CommandInput placeholder="Type a command…" />
            <CommandList>
              <CommandEmpty>No commands found.</CommandEmpty>
              <CommandGroup heading="Starter">
                <CommandItem onSelect={() => setCommandOpen(false)}>
                  <Check aria-hidden="true" />
                  Create project<CommandShortcut>⌘N</CommandShortcut>
                </CommandItem>
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
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

export default App
