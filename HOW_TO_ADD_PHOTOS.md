# How to Add New Photos

## Quick Steps

### 1. Add Your Image
Put your image file in:
```
public/artworks/
```
Example: `public/artworks/My New Photo.jpg`

---

### 2. Edit the Artworks File
Open: `src/data/artworks.ts`

---

### 3. Copy & Paste This Template
Add this inside the `artworks` array (after line 49):

```typescript
{
    id: "your-photo-id",
    filename: "Your Photo Name.jpg",
    title: { ar: "العنوان بالعربية", en: "English Title" },
    mood: ["shadow"],
    year: 2024,
},
```

---

## Template Options

### Basic (required fields only)
```typescript
{
    id: "morning-light",
    filename: "Morning Light.jpg",
    title: { ar: "ضوء الصباح", en: "Morning Light" },
    mood: ["light"],
    year: 2024,
},
```

### With Quote
```typescript
{
    id: "empty-room",
    filename: "Empty Room.jpg",
    title: { ar: "غرفة فارغة", en: "Empty Room" },
    quote: {
        ar: "الصمت أبلغ من الكلام",
        en: "Silence speaks louder than words",
    },
    mood: ["shadow", "passage"],
    year: 2024,
},
```

### With Quote + Author
```typescript
{
    id: "waiting",
    filename: "Waiting.jpg",
    title: { ar: "انتظار", en: "Waiting" },
    quote: {
        ar: "كل انتظار هو بداية",
        en: "Every wait is a beginning",
        author: { ar: "الكاتب", en: "Author Name" }
    },
    mood: ["passage"],
    year: 2024,
},
```

---

## Mood Options

| Mood | Description |
|------|-------------|
| `"shadow"` | Dark, moody, mysterious |
| `"light"` | Bright, hopeful, illuminated |
| `"passage"` | Transitional, journeys, thresholds |
| `"night"` | Nocturnal, quiet, contemplative |

You can use multiple moods: `["shadow", "night"]`

---

## Important Rules

1. **id** must be unique and lowercase with dashes (e.g., `"my-photo"`)
2. **filename** must exactly match your file name in `public/artworks/`
3. **mood** must be an array with at least one option
4. Don't forget the comma `,` after each photo entry!

---

## After Adding

1. Save the file
2. Commit and push to GitHub
3. Vercel will automatically deploy

```bash
git add .
git commit -m "Add new photo"
git push
```
