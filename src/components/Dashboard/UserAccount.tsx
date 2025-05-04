
import React from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function UserAccount() {
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
      duration: 3000,
    });
  };
  
  const handleProfileClick = () => {
    toast({
      title: "Profile",
      description: "Profile settings would open here",
      duration: 2000,
    });
  };
  
  const handleSettingsClick = () => {
    toast({
      title: "Account Settings",
      description: "Account settings would open here",
      duration: 2000,
    });
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 border-2 border-primary/30 cursor-pointer hover:border-primary/60 transition-colors">
          <AvatarImage src="" alt="User" />
          <AvatarFallback className="text-xs bg-primary/20 text-primary">RS</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-card border-border/50" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>Ritik Singh</span>
            <span className="text-xs font-normal text-muted-foreground">singhritik4433@gmail.com</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleProfileClick}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSettingsClick}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
