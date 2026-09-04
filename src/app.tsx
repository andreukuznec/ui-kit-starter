import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import {
  Bell,
  Bold,
  CalendarIcon,
  Check,
  CircleAlert,
  CircleCheck,
  Command as CommandIcon,
  Inbox,
  Info,
  Monitor,
  Moon,
  MoreHorizontal,
  Sun,
  TriangleAlert,
} from "lucide-react"
import { lazy, Suspense, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { AppSidebar } from "@/components/app-sidebar"
import { useTheme } from "@/components/theme-provider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Combobox } from "@/components/ui/combobox"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { type ColumnDef, DataTable } from "@/components/ui/data-table"
import { type DateRange, DateRangePicker } from "@/components/ui/date-range-picker"
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
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
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
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Toaster } from "@/components/ui/sonner"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const ChartsCard = lazy(() => import("@/components/charts-card"))

const themeCycle = { dark: "light", light: "system", system: "dark" } as const

type Workstream = {
  name: string
  owner: string
  status: string
  variant: "default" | "destructive" | "outline" | "secondary"
}

const workstreams: Workstream[] = [
  { name: "Design tokens", status: "Active", variant: "default", owner: "Ana" },
  { name: "Docs migration", status: "Draft", variant: "secondary", owner: "Marc" },
  { name: "API review", status: "Review", variant: "outline", owner: "Yuki" },
  { name: "Legacy cleanup", status: "Blocked", variant: "destructive", owner: "Sam" },
]

const workstreamColumns: ColumnDef<Workstream>[] = [
  {
    accessorKey: "name",
    header: "Workstream",
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant={row.original.variant}>{row.getValue("status")}</Badge>,
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => <div className="text-right">{row.getValue("owner")}</div>,
  },
]

const frameworkOptions = [
  { label: "Vite", value: "vite" },
  { label: "Next.js", value: "next" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
]

const tagOptions = [
  { label: "Design", value: "design" },
  { label: "Docs", value: "docs" },
  { label: "API", value: "api" },
  { label: "A11y", value: "a11y" },
]

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
  const [opacity, setOpacity] = useState(64)
  const [framework, setFramework] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [sprintRange, setSprintRange] = useState<DateRange | undefined>()

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
                  <Kbd className="hidden sm:inline">⌘K</Kbd>
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Theme: ${theme} (click to switch)`}
                      onClick={() => setTheme(themeCycle[theme])}
                    >
                      {theme === "light" ? (
                        <Sun aria-hidden="true" />
                      ) : theme === "system" ? (
                        <Monitor aria-hidden="true" />
                      ) : (
                        <Moon aria-hidden="true" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Toggle theme</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
            <section id="showcase" className="space-y-2">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#showcase">Relay UI</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Starter</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
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
                  <CardTitle>Selection and inputs</CardTitle>
                  <CardDescription>
                    Checkboxes, switches, radios, sliders, and toggles share focus rings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <div className="flex items-center gap-2">
                      <Checkbox id="email-digest" defaultChecked />
                      <Label htmlFor="email-digest">Email digest</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="auto-save" defaultChecked />
                      <Label htmlFor="auto-save">Auto-save</Label>
                    </div>
                  </div>
                  <RadioGroup
                    defaultValue="comfortable"
                    className="flex flex-wrap gap-4"
                    aria-label="Density"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="comfortable" id="density-comfortable" />
                      <Label htmlFor="density-comfortable">Comfortable</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="compact" id="density-compact" />
                      <Label htmlFor="density-compact">Compact</Label>
                    </div>
                  </RadioGroup>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <Label htmlFor="opacity">Opacity</Label>
                      <span className="text-muted-foreground tabular-nums">{opacity}%</span>
                    </div>
                    <Slider
                      id="opacity"
                      value={[opacity]}
                      onValueChange={(value) => setOpacity(value[0] ?? 0)}
                      max={100}
                      step={1}
                      aria-label="Opacity"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Toggle variant="outline" aria-label="Bold" defaultPressed>
                      <Bold aria-hidden="true" />
                    </Toggle>
                    <ToggleGroup
                      type="single"
                      defaultValue="week"
                      variant="outline"
                      aria-label="Range"
                    >
                      <ToggleGroupItem value="day">Day</ToggleGroupItem>
                      <ToggleGroupItem value="week">Week</ToggleGroupItem>
                      <ToggleGroupItem value="month">Month</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progress and status</CardTitle>
                  <CardDescription>
                    Status tokens stay aligned with badges, bars, and loading indicators.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Sync</span>
                      <span className="text-muted-foreground tabular-nums">64%</span>
                    </div>
                    <Progress value={64} aria-label="Sync progress" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Spinner />
                    Refreshing workstreams
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="success">Shipped</Badge>
                    <Badge variant="warning">Degraded</Badge>
                    <Badge variant="info">Notice</Badge>
                  </div>
                  <div className="space-y-2">
                    <Alert variant="success">
                      <CircleCheck aria-hidden="true" />
                      <AlertTitle>Deploy succeeded</AlertTitle>
                      <AlertDescription>Status tokens share these surfaces.</AlertDescription>
                    </Alert>
                    <Alert variant="warning">
                      <TriangleAlert aria-hidden="true" />
                      <AlertTitle>Cache is stale</AlertTitle>
                      <AlertDescription>
                        Refresh workstreams to pick up the latest run.
                      </AlertDescription>
                    </Alert>
                    <Alert variant="info">
                      <Info aria-hidden="true" />
                      <AlertTitle>New tokens available</AlertTitle>
                      <AlertDescription>
                        Info alerts use the same semantic color as badges.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
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
                      <div className="grid gap-4 sm:grid-cols-2">
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
                        <div className="space-y-2">
                          <Label htmlFor="sprint-range">Sprint range</Label>
                          <DateRangePicker
                            id="sprint-range"
                            date={sprintRange}
                            onDateChange={setSprintRange}
                            numberOfMonths={1}
                          />
                        </div>
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
                  <div className="mt-6 grid gap-4 border-t pt-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="framework">Framework</Label>
                      <Combobox
                        id="framework"
                        options={frameworkOptions}
                        value={framework}
                        onValueChange={setFramework}
                        placeholder="Select a framework"
                        searchPlaceholder="Search frameworks…"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label id="tags-label" htmlFor="tags">
                        Tags
                      </Label>
                      <MultiSelect
                        id="tags"
                        aria-labelledby="tags-label"
                        options={tagOptions}
                        value={tags}
                        onValueChange={setTags}
                        placeholder="Select tags"
                        searchPlaceholder="Search tags…"
                      />
                    </div>
                  </div>
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">
                        <CircleAlert aria-hidden="true" />
                        Delete workspace
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this workspace?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. The workspace and its workstreams will be
                          removed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={() => toast.success("Workspace deleted")}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
                  <Collapsible>
                    <CollapsibleTrigger className="flex min-h-11 w-full items-center rounded-md px-2 text-left text-xs font-medium text-muted-foreground hover:bg-secondary/45 hover:text-foreground">
                      When should collapsible be used?
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-2 pb-3 text-sm text-muted-foreground">
                      Prefer it for a single panel. Accordions group several sections.
                    </CollapsibleContent>
                  </Collapsible>
                  <ScrollArea className="h-24 rounded-md border">
                    <ul className="space-y-1 p-3 text-sm">
                      {[
                        "Color tokens",
                        "Type scale",
                        "Spacing",
                        "Motion",
                        "Density",
                        "Elevation",
                      ].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </ScrollArea>
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
                  <CardTitle>Surfaces and empty states</CardTitle>
                  <CardDescription>
                    Tabs, avatars, and empty placeholders for secondary views.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="guidance">
                    <TabsList aria-label="Starter surfaces">
                      <TabsTrigger value="guidance">Guidance</TabsTrigger>
                      <TabsTrigger value="vacant">Vacant</TabsTrigger>
                    </TabsList>
                    <TabsContent value="guidance" className="space-y-4 pt-4">
                      <p className="text-sm text-muted-foreground">
                        Hover an owner to inspect assignment, then keep scanning the kit.
                      </p>
                      <HoverCard>
                        <HoverCardTrigger
                          aria-label="Ana profile"
                          className="inline-flex rounded-full"
                        >
                          <Avatar>
                            <AvatarFallback>AN</AvatarFallback>
                          </Avatar>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-56">
                          <p className="text-sm font-medium">Ana</p>
                          <p className="text-sm text-muted-foreground">Owns design tokens.</p>
                        </HoverCardContent>
                      </HoverCard>
                    </TabsContent>
                    <TabsContent value="vacant" className="pt-2">
                      <Empty className="border border-dashed p-6 md:p-6">
                        <EmptyHeader>
                          <EmptyMedia variant="icon">
                            <Inbox aria-hidden="true" />
                          </EmptyMedia>
                          <EmptyTitle>No activity yet</EmptyTitle>
                          <EmptyDescription>
                            New workstreams will land here once the team publishes them.
                          </EmptyDescription>
                        </EmptyHeader>
                      </Empty>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card id="workstreams">
                <CardHeader>
                  <CardTitle>Data table</CardTitle>
                  <CardDescription>Semantic table primitives with status badges.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable columns={workstreamColumns} data={workstreams} />
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
