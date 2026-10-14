const CONFIG = {
  site: {
    title: "Pembuat Kartu Ucapan",
    headline: "Bikin kartu ucapan yang",
    highlight: "bikin senyum",
    subtitle: "Isi formnya, lihat hasilnya langsung, lalu kirim ke orang tersayang lewat satu link."
  },

  event: "birthday",
  theme: "kawung",

  events: {
    birthday: {
      label: "Ulang Tahun",
      tag: "Kartu Ulang Tahun",
      pre: "Selamat Ulang Tahun,",
      milestone: "24 Tahun",
      mLabel: "Ulang Tahun ke- / Usia",
      mPh: "Contoh: 24 Tahun atau 17",
      mHint: "Angka yang kamu tulis otomatis muncul di pin lencana foto sampul!",
      hPh: "Kutipan pembuka (mis. Sebuah babak baru yang penuh berkah)",
      tplHead: "Sebuah babak baru untuk dirayakan.",
      tplLetter: "Selamat atas hari istimewamu! Melihat caramu terus bertumbuh selalu jadi hal yang mengagumkan.\n\nSemoga langkahmu ke depan dipenuhi kesehatan, kebahagiaan tanpa henti, dan keberanian mengejar impian yang kamu cintai.",
      roles: ["Sahabatmu", "Teman Dekat", "Pasanganmu", "Keluarga"]
    },
    graduation: {
      label: "Wisuda",
      tag: "Kartu Wisuda",
      pre: "Selamat Wisuda,",
      milestone: "Angkatan 2026",
      mLabel: "Angkatan / Tahun Lulus",
      mPh: "Contoh: Angkatan 2026 atau Lulusan 2026",
      mHint: "Tahun kelulusan akan menghiasi lencana sampul wisuda!",
      hPh: "Kutipan kebanggaan (mis. Perjuangan panjang yang berbuah manis)",
      tplHead: "Perjuangan panjang yang berbuah manis.",
      tplLetter: "Selamat atas kelulusanmu! Semua malam panjang, lembar revisi, dan lelahmu hari ini terbayar lunas dengan bangga.\n\nIni bukan akhir perjalanan, melainkan gerbang awal menuju karya-karya hebatmu di dunia nyata. Sukses selalu!",
      roles: ["Sahabatmu", "Rekan Seperjuangan", "Adik Tingkat", "Keluarga"]
    },
    confess: {
      label: "Confess",
      tag: "A Little Confession",
      pre: "Ada yang ingin kusampaikan,",
      milestone: "Dari Hati",
      mLabel: "Clue / Catatan Rahasia",
      mPh: "Contoh: Dari meja sudut / Teman satu kelas",
      mHint: "Catatan kecil atau inisial tempat kalian sering bertemu.",
      hPh: "Kata pengantar (mis. Ada rasa yang terlalu lama kusimpan sendiri)",
      tplHead: "Ada rasa yang terlalu lama kusimpan sendiri.",
      tplLetter: "Mungkin ini mengejutkanmu, tapi aku hanya ingin jujur dengan perasaanku sendiri.\n\nSetiap hariku terasa lebih cerah setiap kali melihat senyummu. Aku tidak menuntut balasan apa pun, hanya ingin kamu tahu bahwa kamu begitu berharga.",
      roles: ["Secret Admirer", "Seseorang yang Mengagumimu", "Teman Rahasia"]
    },
    anniversary: {
      label: "Anniversary",
      tag: "Another Chapter Together",
      pre: "Untuk kita,",
      milestone: "3 Tahun Bersama",
      mLabel: "Lama Bersama / Tanggal Spesial",
      mPh: "Contoh: 3 Tahun Bersama atau 24 Oktober",
      mHint: "Angka tahun/hari jadian akan tampil di pin lencana foto.",
      hPh: "Kutipan cinta (mis. Terima kasih sudah memilih bertahan bersamaku)",
      tplHead: "Terima kasih sudah memilih bertahan bersamaku.",
      tplLetter: "Melewati hari demi hari bersamamu adalah berkah terbaik dalam hidupku.\n\nTerima kasih untuk setiap tawa, kesabaran, dan pelukan hangat saat duniaku sedang lelah. Semoga kisah kita terus bertumbuh indah selamanya.",
      roles: ["Pasanganmu", "Pacarmu yang Bawel", "Belahan Jiwamu", "Suamimu/Istrimu"]
    },
    wedding: {
      label: "Wedding",
      tag: "The Wedding Invitation",
      pre: "Dengan penuh kebahagiaan,",
      milestone: "2026",
      mLabel: "Tanggal Pernikahan / Lokasi",
      mPh: "Contoh: 12 Desember 2026",
      mHint: "Tanggal atau tahun momen sakral pernikahan.",
      hPh: "Kutipan doa (mis. Dua hati, satu janji, selamanya)",
      tplHead: "Dua hati, satu janji, selamanya.",
      tplLetter: "Selamat menempuh babak baru yang penuh berkah! Semoga cinta yang menyatukan kalian berdua hari ini terus bersemi hingga hari tua.\n\nSemoga rumah tangga kalian selalu dipenuhi damai, saling melengkapi, dan bahagia selalu.",
      roles: ["Sahabatmu", "Teman Dekat", "Rekan Kerja", "Keluarga Besar"]
    },
    breakup: {
      label: "Breakup",
      tag: "The Last Letter",
      pre: "Untuk cerita yang pernah ada,",
      milestone: "Pamit Baik-baik",
      mLabel: "Tahun / Kalimat Penutup",
      mPh: "Contoh: 2024 - 2026 / Terima Kasih",
      mHint: "Penanda waktu atau ungkapan penutup perjalanan.",
      hPh: "Kutipan perpisahan (mis. Terima kasih untuk setiap halaman indah)",
      tplHead: "Terima kasih untuk setiap halaman indah yang pernah ada.",
      tplLetter: "Tidak semua cerita harus berjalan selamanya untuk bisa disebut bermakna. Terima kasih pernah menjadi bagian penting dalam hidupku.\n\nAku pamit dengan doa terbaik untuk kebahagiaanmu di masa depan. Jaga dirimu baik-baik.",
      roles: ["Seseorang dari Masa Lalumu", "Teman Baikmu", "Aku"]
    },
    christmas: {
      label: "Christmas",
      tag: "A Little Christmas Note",
      pre: "Selamat Natal,",
      milestone: "Natal 2026",
      mLabel: "Tahun / Momen Natal",
      mPh: "Contoh: Natal 2026",
      mHint: "Tahun perayaan Natal yang penuh sukacita.",
      hPh: "Kutipan damai (mis. Damai dan sukacita di malam yang hangat)",
      tplHead: "Damai dan sukacita di malam yang hangat.",
      tplLetter: "Selamat Hari Natal! Semoga damai dan kehangatan Natal selalu menyelimuti hatimu dan keluarga tercinta.\n\nSemoga tahun yang baru membawa harapan segar dan kebahagiaan yang melimpah.",
      roles: ["Sahabatmu", "Teman Seiman", "Keluarga"]
    },
    raya: {
      label: "Hari Raya",
      tag: "Salam Hangat Hari Raya",
      pre: "Selamat Hari Raya,",
      milestone: "1447 H / 2026",
      mLabel: "Tahun / Nama Perayaan",
      mPh: "Contoh: Idul Fitri 1447 H",
      mHint: "Tahun atau momen perayaan suci.",
      hPh: "Kutipan silaturahmi (mis. Sucikan hati, eratkan kembali silaturahmi)",
      tplHead: "Sucikan hati, eratkan kembali silaturahmi.",
      tplLetter: "Selamat Hari Raya! Mohon maaf lahir dan batin atas segala khilaf kata dan perbuatan.\n\nSemoga kebersamaan hari ini membawa keberkahan, kesehatan, dan kedamaian untuk kita sekeluarga.",
      roles: ["Keluarga", "Sahabatmu", "Rekan Kerja"]
    },
    deathnote: {
      label: "Death Note wkwk",
      tag: "CONFIDENTIAL • JUST FOR FUN",
      pre: "Nama yang tertulis di sini:",
      milestone: "FIKSI • BERCANDA",
      mLabel: "Alasan / Catatan Absurd",
      mPh: "Contoh: Suka ngaret pas janjian",
      mHint: "Catatan bercanda untuk teman akrab.",
      hPh: "Kutipan takdir (mis. Tertulis sudah di dalam lembar takdir wkwk)",
      tplHead: "Tertulis sudah di dalam lembar takdir wkwk.",
      tplLetter: "Nama kamu resmi terdaftar karena kebiasaan ngaret dan bikin emosi tapi tetep ngangenin.\n\nHukumanmu adalah harus traktir makan siang dan gak boleh banyak alasan. Awas aja kalau kabur!",
      roles: ["Malaikat Pencabut Kebosanan", "Dewa Shinigami", "Teman yang Sabar"]
    }
  },

  recipient: {
    name: "",
    titleDegree: ""
  },

  sender: {
    name: "",
    role: ""
  },

  headline: "",

  letter: [""],

  shareMessage: "Ada kartu ucapan untuk {nama} 🎉 Buka di sini: {link}",

  themes: {
    kawung: {
      label: "Kawung",
      pattern: "kawung",
      layout: "folio", shape: "Klasik",
      c: "#5a3a22", p: "#f3e7cf", k: "#2b1a10", a: "#d9a441", b: "#2c3e66",
      pc: "#7a5232", ip: "#e9dcc0"
    },
    parang: {
      label: "Parang",
      pattern: "parang",
      layout: "split", shape: "Lanskap",
      c: "#1f2f57", p: "#f1ead8", k: "#101a33", a: "#e0b44c", b: "#c4553b",
      pc: "#32477c", ip: "#e5ddc6"
    },
    truntum: {
      label: "Truntum",
      pattern: "truntum",
      layout: "arch", shape: "Lengkung",
      c: "#7a1f2b", p: "#f6ead8", k: "#2a0d12", a: "#e2b85c", b: "#3f6b5a",
      pc: "#963445", ip: "#eddcc4"
    },
    songket: {
      label: "Songket",
      pattern: "songket",
      layout: "polaroid", shape: "Polaroid",
      c: "#1f5a4a", p: "#f2ecd9", k: "#0f2a23", a: "#e5b94a", b: "#c0504d",
      pc: "#2f7462", ip: "#e3dec4"
    },
    noir: { label: "Noir Romance", pattern: "truntum", layout: "split", shape: "Editorial", c: "#190f16", p: "#f5e9e9", k: "#100a0e", a: "#c7354b", b: "#4a1828", pc: "#6e2337", ip: "#ead8dc" },
    rose: { label: "Soft Rose", pattern: "truntum", layout: "arch", shape: "Romantis", c: "#d987a5", p: "#fff0f5", k: "#4c2636", a: "#f7c8d9", b: "#b9dce8", pc: "#a95878", ip: "#fff7fa" },
    sky: { label: "Blue Hour", pattern: "parang", layout: "split", shape: "Minimal", c: "#315a83", p: "#edf6ff", k: "#142b42", a: "#f2cf82", b: "#9bc5e7", pc: "#6c94bc", ip: "#f5faff" },
    butter: { label: "Butter Yellow", pattern: "kawung", layout: "polaroid", shape: "Playful", c: "#e8c75b", p: "#fff9df", k: "#453b1d", a: "#fff0a8", b: "#e59b85", pc: "#b18c30", ip: "#fffbed" },
    paper: { label: "White Paper", pattern: "truntum", layout: "folio", shape: "Clean", c: "#f7f5ef", p: "#ffffff", k: "#272727", a: "#b7a98a", b: "#d9d4ca", pc: "#d8d2c6", ip: "#f1eee7" },
    evergreen: { label: "Evergreen", pattern: "songket", layout: "arch", shape: "Holiday", c: "#174b3d", p: "#fff8e9", k: "#102d25", a: "#d9b76e", b: "#a93c42", pc: "#397362", ip: "#f4ead3" },
    lilac: { label: "Lilac Haze", pattern: "truntum", layout: "polaroid", shape: "Soft", c: "#8376a8", p: "#f7f2ff", k: "#302745", a: "#e7c9ef", b: "#c9d9f3", pc: "#a89acb", ip: "#f1eafa" },
    midnight: { label: "Midnight Ink", pattern: "parang", layout: "folio", shape: "Dark", c: "#151b2b", p: "#e9edf5", k: "#0c101b", a: "#9caed0", b: "#586b91", pc: "#465575", ip: "#dfe4ef" }
  }
};