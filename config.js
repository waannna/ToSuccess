/**
 * ==============================================================================
 * KONFIGURASI PEMBUAT KARTU UCAPAN (ULANG TAHUN & WISUDA) - TEMA NUSANTARA
 * ==============================================================================
 * Berkas ini hanya berisi NILAI AWAL (default) dan daftar tema.
 * Pengguna tetap mengisi kartu lewat form di website; nilai di bawah hanya
 * muncul sebagai isian awal. Semua teks & warna di sini bebas Anda ubah.
 */

const CONFIG = {
  // Teks halaman pembuat kartu
  site: {
    title: "Pembuat Kartu Ucapan",
    headline: "Bikin kartu ucapan yang",
    highlight: "bikin senyum",
    subtitle: "Isi formnya, lihat hasilnya langsung, lalu kirim ke orang tersayang lewat satu link."
  },

  // Acara awal: "birthday" atau "graduation"
  event: "birthday",

  // Tema awal: "kawung", "parang", "truntum", atau "songket" (lihat daftar di bawah)
  theme: "kawung",

  // Teks per jenis acara
  events: {
    birthday: {
      label: "Ulang Tahun",
      tag: "Kartu Ulang Tahun",
      pre: "Selamat Ulang Tahun,",
      milestone: ""
    },
    graduation: {
      label: "Wisuda",
      tag: "Kartu Wisuda",
      pre: "Selamat Wisuda,",
      milestone: "Angkatan 2026"
    }
  },

  // Isian awal penerima
  recipient: {
    name: "",
    titleDegree: "" // contoh: "S.Ds." (hanya tampil untuk wisuda)
  },

  // Isian awal pengirim
  sender: {
    name: "",
    role: ""
  },

  headline: "",

  letter: [""],

  // Pesan saat dibagikan. {nama} = nama penerima, {link} = link kartu
  shareMessage: "Ada kartu ucapan untuk {nama} 🎉 Buka di sini: {link}",

  /**
   * Daftar tema. Semua warna SOLID (tanpa gradient).
   *  c  = warna utama sampul        p  = warna kertas / krem
   *  k  = warna tinta gelap         a  = aksen emas / kuning
   *  b  = aksen kedua               pc = warna motif di sampul (sedikit lebih terang dari c)
   *  ip = warna motif di kertas isi (sangat halus)
   *  pattern = "kawung" | "parang" | "truntum" | "songket"
   *  layout  = BENTUK KARTU: "folio" (portret klasik) | "split" (lanskap terbelah) |
   *            "arch" (lengkung / gerbang) | "polaroid" (foto polaroid + pita tenun)
   *  shape   = nama bentuk yang tampil di bawah pilihan tema
   */
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
    }
  }
};