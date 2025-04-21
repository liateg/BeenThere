

# BeenThere - Travel Tracker



Track the countries you've visited on an interactive world map!

## 🌍 Features

- **Visual World Map**: See visited countries highlighted in teal
- **Easy Adding**: Search and add countries with auto-complete
- **Progress Tracking**: Count of visited countries displayed
- **Case-Insensitive Search**: Find countries regardless of capitalization
- **Persistent Storage**: Your travel history saved in PostgreSQL

## 🛠️ Tech Stack

**Backend**:
- Node.js
- Express
- PostgreSQL (pg)
- Body-parser

**Frontend**:
- EJS templates
- SVG World Map
- Vanilla JavaScript
- CSS

## 🚀 Quick Start

1. **Clone the repo**:
   ```bash
   git clone https://github.com/liateg/BeenThere.git
   cd BeenThere
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up database**:
   - Start PostgreSQL
   - Create a database named `country`
   - Set up tables using the SQL

4. **Configure**:
   Edit the database credentials in `index.js` if needed.

5. **Run**:
   ```bash
   node index.js
   ```
   Visit `http://localhost:3000`

## 🗺️ How It Works

1. The SVG world map displays all countries
2. Countries you've added turn **teal**
3. Insert by name to add them
4. Your total count updates automatically


## 💡 Example Code

**Highlighting visited countries**:
```javascript
// In your index.ejs
<script>
  const visited = '<%= countries %>'.split(',');
  visited.forEach(code => {
    const country = document.getElementById(code);
    if(country) country.style.fill = 'teal';
  });
</script>
```

## 🤝 Contributing

Contributions welcome! Please fork and submit PRs.

## 📜 License

MIT © [Liya Tegared]

---

