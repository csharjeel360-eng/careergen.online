# NipponCareer — regaltribune.com 風クローン

`ja.regaltribune.com` のレイアウト構成（ヘッダー、ブログ一覧のホームページ、サイドバー、記事詳細ページ、フッター）を参考にした、
求人情報サイトのクローンです。**Next.js 14 (App Router) + TypeScript + Tailwind CSS** で構築しています。

掲載しているコンテンツ（記事タイトル・本文・画像）はすべてオリジナルで、元サイトの文章はそのまま使用していません。
構造とレイアウトのみを再現しています。

## 含まれるページ

- `/` — ホームページ（トップ記事 + 求人一覧 + サイドバー）
- `/jobs/[slug]` — 求人詳細ページ（元サイトのブログ詳細ページと同じ構造）
  - `/jobs/hotel-front-desk-germany`
  - `/jobs/convenience-store-staff-guide`
  - `/jobs/cleaning-staff-recruitment`

求人データは `data/jobs.ts` に1つの配列としてまとめてあるので、内容の追加・編集はここだけで完結します。

## セットアップ

```bash
npm install
npm run dev
```

`http://localhost:3000` で確認できます。

## 本番ビルド

```bash
npm run build
npm start
```

## 構成

```
app/
  layout.tsx          # 共通レイアウト（ヘッダー・フッター・フォント）
  page.tsx             # ホームページ
  globals.css          # Tailwindとグローバルスタイル
  jobs/[slug]/page.tsx # 求人詳細ページ（動的ルート）
components/
  Header.tsx
  Footer.tsx
  JobCard.tsx
  Sidebar.tsx
data/
  jobs.ts              # 3件の求人記事データ
```
