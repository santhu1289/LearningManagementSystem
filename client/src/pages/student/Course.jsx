import { Card, CardContent } from "@/components/ui/card";
// eslint-disable-next-line no-unused-vars
import React from "react";
import Online from "../../assets/online.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img src={Online} className="w-full h-auto object-cover rounded-t-lg" />
      </div>
      <CardContent className="mt-2">
        <h1 className="hover:underline font-bold text-lg truncate text-center">
          Online Classes
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">Dr Sundaramurthy</h1>
          </div>
          <Badge
            className={"bg-blue-600 text-white px-2 py-1 text-xs rounded-full"}
          >
            Beginer
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
