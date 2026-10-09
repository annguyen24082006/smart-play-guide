import React from 'react';

interface TOCProps {
  content: string;
}

export function TableOfContents({ content }: TOCProps) {
  // 1. Tách từng dòng và lọc các dòng bắt đầu bằng ## hoặc ###
  const lines = content.split('\n');
  const headings = lines
    .map((line) => line.trim())
    .filter((line) => line.startsWith('##')) // Lấy cả ## (H2) và ### (H3)
    .map((line) => {
      const isSub = line.startsWith('###'); // Xác định H3 (Mục nhỏ)
      // Xóa các dấu # ở đầu để lấy tên tiêu đề sạch
      const title = line.replace(/^#+\s*/, '');
      // Tạo ID dạng slug không dấu để làm mỏ neo (Anchor link)
      const id = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      return { title, isSub, id };
    });

  if (headings.length === 0) return null;

  return (
    <nav className="my-6 rounded-xl border border-blue-100 bg-blue-50/60 p-4 shadow-sm">
      <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-800">
        <span>📋</span> Mục Lục Bài Viết
      </h3>
      <ul className="space-y-2 text-sm text-slate-700">
        {headings.map((item, index) => (
          <li
            key={index}
            className={`transition-colors hover:text-blue-600 ${
              item.isSub
                ? 'ml-5 list-disc text-slate-600 font-normal' // Lùi vào cho ###
                : 'font-semibold text-slate-800' // Bố cục chính cho ##
            }`}
          >
            <a href={`#${item.id}`} className="hover:underline">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
