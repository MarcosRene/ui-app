import { Plus, Search, FileDown, MoreHorizontal }  from 'lucide-react'

import { Button } from './components/ui/button'
import { Header } from './components/header'
import { Tabs } from './components/tabs'
import { Control, Input } from './components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Pagination } from './components/pagination'

export function App() {
  return (
    <div className="py-10 space-y-8">
      <div>
        <Header />
        <Tabs />
      </div>

      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Tags</h1>
          <Button variant="primary">
            <Plus size={12} />
            Create new
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Input variant='filter'>
            <Search size={12} />
            <Control placeholder='Search tags' />
          </Input>

          <Button >
            Export
            <FileDown size={12} />
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Amount of videos</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell></TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">React</span>
                    <span className="text-xs text-zinc-500">339CE44E-31B3-4A3D-8FA8-8C149F3DE130</span>
                  </div>
                </TableCell>
                <TableCell className="text-zinc-300">13 video(s)</TableCell>
                <TableCell className="text-right">
                  <Button size='icon'>
                    <MoreHorizontal size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination />
      </main>
    </div>
  )
}
