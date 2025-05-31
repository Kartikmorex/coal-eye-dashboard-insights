
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, User, UserX } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserSelectorProps {
  selectedUser?: string;
  onUserSelect: (user: string | undefined) => void;
}

const USERS = [
  "Kartik More",
  "Rajveer Singh", 
  "Siddharth Jha",
  "Hritik Sawant",
  "Sachi Gupta"
];

const UserSelector = ({ selectedUser, onUserSelect }: UserSelectorProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedUser ? (
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {selectedUser}
            </div>
          ) : (
            "Assign user..."
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-background border border-border z-50">
        <Command>
          <CommandInput placeholder="Search users..." />
          <CommandList>
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {selectedUser && (
                <CommandItem
                  onSelect={() => {
                    onUserSelect(undefined);
                    setOpen(false);
                  }}
                >
                  <UserX className="mr-2 h-4 w-4 text-destructive" />
                  Unassign
                </CommandItem>
              )}
              {USERS.map((user) => (
                <CommandItem
                  key={user}
                  onSelect={() => {
                    onUserSelect(user);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedUser === user ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <User className="mr-2 h-4 w-4" />
                  {user}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default UserSelector;
