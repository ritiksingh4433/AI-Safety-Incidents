
import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIncidents } from '@/context/IncidentContext';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '../ui/button';

export function Header() {
  const { 
    filterText, 
    setFilterText, 
    filterSeverity, 
    setFilterSeverity, 
    filterStatus, 
    setFilterStatus 
  } = useIncidents();
  
  const isMobile = useIsMobile();

  return (
    <header className="bg-card/50 backdrop-blur-sm border-b border-border py-3 px-4 sticky top-0 z-10">
      <div className="flex items-center justify-between gap-4">
        {isMobile && (
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search incidents..."
            className="pl-9 bg-secondary/50"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Select
            value={filterSeverity}
            onValueChange={(value) => setFilterSeverity(value as any)}
          >
            <SelectTrigger className="w-[130px] bg-secondary/50">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
          
          {!isMobile && (
            <Select
              value={filterStatus}
              onValueChange={(value) => setFilterStatus(value as any)}
            >
              <SelectTrigger className="w-[130px] bg-secondary/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          )}
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute h-2 w-2 bg-primary rounded-full top-2 right-2"></span>
          </Button>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
