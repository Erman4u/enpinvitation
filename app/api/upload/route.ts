import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const base64Content = Buffer.from(buffer).toString('base64');
    
    const ext = file.name.split('.').pop() || 'png';
    const filename = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
    
    const repo = process.env.GITHUB_IMAGE_REPO;
    const token = process.env.GITHUB_TOKEN;
    const branch = process.env.GITHUB_IMAGE_BRANCH || 'main';
    const baseUrl = process.env.NEXT_PUBLIC_GITHUB_IMAGE_BASE_URL;

    if (!repo || !token) {
      return NextResponse.json({ error: 'GitHub storage not configured' }, { status: 500 });
    }

    const githubApiUrl = `https://api.github.com/repos/${repo}/contents/uploads/${filename}`;
    
    const response = await fetch(githubApiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'EnP-Digital-Invitation'
      },
      body: JSON.stringify({
        message: `Upload ${filename} by ${user.id}`,
        content: base64Content,
        branch: branch
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub API error:', errorData);
      return NextResponse.json({ error: 'Failed to upload to GitHub' }, { status: 500 });
    }

    const imageUrl = `${baseUrl}/uploads/${filename}`;
    
    return NextResponse.json({ url: imageUrl });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
