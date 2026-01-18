import { useData } from '@/contexts/DataContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Search, RefreshCw, ChevronDown, Settings, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  const { user, resetData } = useData();

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <header className="h-16 bg-background border-b border-border/60 px-6 flex items-center justify-between">
      {/* Left section - Title */}
      <div className="min-w-0">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>

      {/* Center section - Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 h-9 bg-muted/40 border-0 focus-visible:ring-1 focus-visible:ring-primary/30 rounded-lg text-sm"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:inline-flex h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right section - Actions & User */}
      <div className="flex items-center gap-1">
        {actions && <div className="mr-2">{actions}</div>}

        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 h-9 rounded-lg ml-1">
              <Avatar className="w-7 h-7">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm font-medium text-foreground leading-none">{user.name}</span>
                <span className="text-[10px] text-muted-foreground capitalize">{user.role}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden lg:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5 bg-popover border shadow-lg">
            <DropdownMenuLabel className="px-2 py-1.5">
              <div className="flex items-center gap-2.5">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-sm truncate">{user.name}</span>
                  <span className="text-[11px] text-muted-foreground truncate">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem className="rounded-lg text-xs py-2 cursor-pointer" asChild>
              <Link to="/settings">
                <Settings className="w-3.5 h-3.5 mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg text-xs py-2 cursor-pointer text-muted-foreground">
              {user.organization}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem onClick={resetData} className="rounded-lg text-xs py-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
              <RefreshCw className="w-3.5 h-3.5 mr-2" />
              Reset Demo Data
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}