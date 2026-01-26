"use client";

import React, { useEffect } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import gsap from "gsap";

export function RecentUsers({ users }: any) {
useEffect(() => {
  gsap.from(".admin-card", {
    opacity: 0,
    y: 10,
    stagger: 0.05,
    ease: "power2.out",
  });
}, []);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u: any) => (
              <TableRow key={u.user_id}>
                <TableCell>{u.fullName}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>{u.accountStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
