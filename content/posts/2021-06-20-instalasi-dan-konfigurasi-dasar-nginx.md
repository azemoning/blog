---
date: 2021-06-21
title: Instalasi dan konfigurasi dasar Nginx
template: post
slug: instalasi-dan-konfigurasi-dasar-nginx
description: ''
categories: 
  - linux
  - server
tags:
  - nginx
  - linux
  - server
---

Nginx (dibaca "Engine-X") adalah sebuah web server open source yang biasanya digunakan sebagai reverse proxy atau HTTP cache.

Tulisan kali ini saya akan menuliskan cara instalasi dan konfigurasi dasar dari Nginx untuk membuat sebuah website sederhana.

#### Instalasi Nginx

Untuk instalasi pada linux dengan basis Debian/Ubuntu, bisa menggunakan perintah berikut:

```shell
sudo apt install nginx -y
```

Ketika instalasi sudah selesai, secara default kita bisa mengakses website bawaan dari nginx dengan mengakses alamat ip/domain dari server kita di web browser. Contoh:

![](https://i.imgur.com/4e7p4Zu.png)

#### Membuat virtual host

Virtual host adalah sebuah metode untuk melakukan hosting berbagai macam domain dalam satu server, sehingga kita bisa menjalankan banyak website sekaligus dalam satu server.

Untuk membuat virtual host di Nginx, cara sederhananya adalah seperti berikut:

Buat terlebih dahulu sebuah direktori baru di ```/var/www``` dengan nama ```tutorial```.

```shell
mkdir /var/www/tutorial
```

> Direktori ```tutorial``` di ```/var/www/tutorial``` hanya sebuah nama, kita bisa menentukan nama apa saja untuk direktori ini

Kemudian, buat file HTML di direktori yang sudah dibuat

```shell
cd /var/www/tutorial && echo "<p>Hello, World</p>" > index.html 
```

##### Konfigurasi virtual host

Setelah selesai membuat direktori baru dan halaman HTML-nya, selanjutnya kita perlu membuat sebuah konfigurasi virtual host baru di ```/etc/nginx/sites-available``` agar dapat dibaca oleh Nginx.

```shell
sudo vim /etc/nginx/sites-available/vhost-tutorial.conf
```

> ```vhost-tutorial.conf``` adalah nama file konfigurasi virtual host yang akan kita gunakan, kita bisa menentukan nama file konfigurasi sesuai dengan keinginan

Kemudian tambahkan konfigurasi Nginx pada file konfigurasi yang sudah dibuat seperti berikut:

<div class=filename>/etc/nginx/sites-available/vhost-tutorial.conf</div>

```
server {
       listen 81;
       listen [::]:81;

       server_name vhost.example.com;

       root /var/www/tutorial;
       index index.html;

       location / {
               try_files $uri $uri/ =404;
       }
}
```

> Pada tulisan kali ini, kita akan menggunakan port ```81``` untuk akses ke virtual host kita agar tidak terjadi konflik dengan virtual host bawaan Nginx

Pada baris konfigurasi ```listen```, kita mendefinisikan port yang akan digunakan untuk virtual host kita. Perlu diperhatikan pada baris konfigurasi ```listen [::]:81```, adalah untuk konfigurasi IPv6.

Kemudian pada baris konfigurasi ```server_name```, kita mendefinisikan domain name dari virtual host kita, sesuaikan dengan domain name yang akan kita gunakan.

Baris konfigurasi ```root``` adalah tempat kita mendefinisikan lokasi dari file HTML kita. Sedangkan baris konfigurasi ```index``` adalah untuk mendefinisikan file HTML mana yang akan pertama kali dibuka oleh Nginx.

Pada baris konfigurasi ```try_files``` di dalam directive ```location /``` kita mendefinisikan sebuah page not found handling, jadi ketika ada url yang tidak tersedia di virtual host kita, maka akan ditampilkan halaman 404.

> ```404``` adalah HTTP response code untuk halaman atau file yang tidak ditemukan di server (Not Found)

Setelah itu, simpan file konfigurasi yang sudah dituliskan dan keluar dari text editor.

##### Mengaktifkan virtual host

Sebelum mengaktifkan virtual host, setidaknya kita perlu untuk menguji konfigurasi yang sudah kita tuliskan. Kita bisa menguji konfigurasi dengan menggunakan perintah berikut:

```shell
nginx -t
```

Jika hasilnya ```ok``` dan ```successful``` maka konfigurasi kita sudah sesuai.

```terminal
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

```

Untuk mengaktifkan virtual host pada Nginx menggunakan file konfigurasi yang sudah kita buat, pertama kita harus memasukkan file konfigurasi tersebut ke dalam direktori ```sites-enabled``` pada direktori Nginx.

> Di Nginx, direktori ```sites-enabled``` adalah direktori virtual host yang sudah aktif (enabled) sehingga untuk mengaktifkan virtual host, file konfigurasinya perlu dimasukkan ke dalam direktori tersebut

Cara paling mudah untuk memindahkan file konfigurasi yang ada di direktori ```sites-available``` adalah dengan menggunakan perintah berikut:

```shell
sudo ln -s /etc/nginx/sites-available/vhost-tutorial.conf /etc/nginx/sites-enabled/vhost-tutorial.conf
```

Perintah tersebut akan membuat sebuah symbolic link untuk file vhost-tutorial.conf di direktori ```sites-available``` ke dalam direktori ```sites-enabled```

> Symbolic link adalah istilah untuk file di direktori tertentu yang mereferensikan file lain di direktori berbeda 

Setelah itu kita bisa melakukan restart service Nginx pada server dengan perintah berikut:

```shell
sudo systemctl restart nginx
```

Kemudian coba akses domain atau ip address dari virtual host yang sudah kita aktifkan melalui web browser

![](https://i.imgur.com/9oazUNL.png)

Jika tampilan di web browser seperti pada contoh gambar di atas, artinya virtual host yang kita buat sudah berhasil dijalankan.

![](https://i.imgur.com/AXvwsbt.png)

Tampilan halaman ketika terjadi not found.

#### Kesimpulan

Untuk instalasi dan konfigurasi dasar dari Nginx cukup mudah, dan dengan menggunakan virtual host kita bisa membuat banyak website dalam satu server.