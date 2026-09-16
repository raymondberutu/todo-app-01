import { NextRequest, NextResponse } from 'next/server';
import { getTasks } from '@/lib/tasks';
import { todoService } from '@/services/todoService';

export async function GET(req: NextRequest) {
  try {
    // Memastikan limit selalu berupa angka yang valid (default: 10)
    const limitParam = req.nextUrl.searchParams.get('limit');
    const limit = limitParam ? Number(limitParam) : 10;
    
    const tasks = await getTasks(limit);
    
    return NextResponse.json({ 
      success: true, 
      data: tasks 
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: 'Gagal terhubung ke DummyJSON API.',
      error: error.message 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ success: false, error: 'Judul wajib diisi' }, { status: 400 });
    }

    const newTask = await todoService.create({ todo: body.title, completed: false, userId: 1 });
    return NextResponse.json({ success: true, data: newTask }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}