---
date: 2019-05-02
title: 'Bermigrasi dari Wordpress ke Static Website'
template: post
thumbnail: '../thumbnails/gatsby.png'
slug: 'migrasi-wordpress-ke-gatsby'
description: 'hehe'
categories:
    - Personal
tags:
    - gatsby
    - wordpress
---
### dan kembalinya saya ke dunia per-blog-an

Halo, sudah lama sekali saya tidak kembali ke menulis di situs ini. Tentu saja alasannya sama seperti alibi-alibi orang yang menghilang dari dunia maya pada umumnya, saya terlalu sibuk dengan urusan di dunia nyata 😁

Namun, salah satu alasan terbesar saya berhenti sementara untuk menulis adalah adanya kendala pada platform tempat saya sering menulis (ya, blog ini). Platform yang saya gunakan sebelumnya sudah sangat tidak terawat, mulai dari domain yang sudah tidak aktif (saya malas untuk memperpanjang) hingga hal-hal lainnya yang merepotkan.

Sebenarnya pada tulisan pertama saya di situs baru kali ini, saya hanya ingin bercerita tentang saya yang melakukan migrasi situs dari platform lama yang menggunakan wordpress ke platform baru yang menggunakan gatsbyjs (selanjutnya akan saya sebut gatsby saja agar lebih mudah).

Jadi, gatsby adalah salah satu static site generator yang cukup populer di kalangan komunitas [JAMstack](https://jamstack.org/) dan menurut saya sendiri mirip dengan [Nextjs](https://nextjs.org/) yang dimana mereka berdua merupakan framework dari reactjs (frameworknya framework 😁), bedanya gatsby juga mendukung markdown dan data file sebagai source konten website seperti halnya static site generator lainnya.

#### Kenapa menggunakan gatsby?

Kenapa ya? 😕  
Banyak sebenarnya alternatif lain seperti hugo dan jekyll yang sudah lebih dari cukup jika menyesuaikan dengan kebutuhan saya, namun untuk alasannya sendiri saya juga kurang tau kenapa, sepertinya agar terlihat lebih up to date saja hehe. Mungkin karena saat ini saya juga sedang belajar menggunakan framework javascript reactjs, jadi sekalian saja saya coba buat situs atau blog ini menggunakan gatsby yang basisnya dari reactjs.

#### Apa saja stack yang digunakan?

Untuk stack yang saya gunakan untuk membangun situs ini adalah:
- **Netlify**  
Saya menggunakan netlify untuk meng-host situs ini, selain karena memang dikhususkan untuk jamstack, menurut saya setup dan konfigurasinya cukup mudah
- **Gatsby**  
Sudah saya bahas sebelumnya hehe, namun untuk tema dari gatsby sendiri saya menggunakan tema yang dikembangkan oleh [Tania](https://www.taniarascia.com/)
- **Github**  
Saya menggunakan github untuk meletakkan source code dari situs ini agar lebih mudah saya kembangkan dan mempermudah orang lain yang ingin menggunakan source code ini juga

#### Proses migrasi

Untuk proses migrasi sendiri ada beberapa hal yang menjadi pr untuk saya kerjakan pada situs ini, namun yang menurut saya penting adalah:
- Migrasi konten pada platform lama ke platform baru  
Migrasi konten ini sebenarnya cukup mudah, tinggal menyesuaikan dengan format markdown pada gatsby, hanya saja butuh waktu dan niat tentunya.
- Penyesuaian tampilan agar lebih nyaman dilihat  
Ini hanya nilai dari sudut pandang saya sendiri, apakah sudah sesuai dengan yang saya inginkan atau belum, jadi seiring dengan waktu, tampilan dari situs ini tentunya akan selalu berubah.

#### Kesimpulan

Proses migrasi ini tidak akan berhenti sampai waktu yang tidak dapat saya tentukan, sehingga kedepannya nanti ketika saya ingin melakukan perubahan besar atau bahkan berubah haluan menggunakan platform baru maka proses migrasi ini akan saya lakukan terus menerus 😁 