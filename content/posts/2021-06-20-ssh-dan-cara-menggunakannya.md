---
date: 2021-06-20
title: SSH dan cara menggunakannya
template: post
slug: ssh-dan-cara-menggunakannya
description: ''
categories: 
  - linux
  - server
tags:
  - ssh
  - linux
---

SSH adalah sebuah protokol yang digunakan untuk melakukan koneksi remote yang aman ke dalam server dengan mode CLI atau secara text-based. Jadi, ketika kita berhasil terhubung dengan server kita menggunakan SSH, apa yang kita ketikkan pada layar terminal kita akan langsung dieksekusi oleh server kita di awan sana dan tentunya apa yang kita eksekusi semuanya terenkripsi dengan protokol enkripsi tertentu.

Pada tulisan kali ini saya akan mendokumentasikan apa saja yang biasanya saya lakukan dengan SSH untuk keperluan mengakses server secara remote.

##### Bagaimana cara SSH bekerja?

Sederhananya ketika kita melakukan koneksi melalui SSH, kita akan dimasukkan ke dalam sebuah shell session di dalam server berupa text-based interface atau CLI dan kita dapat melakukan interaksi pada server kita layaknya kita sedang terhubung langsung dengan layar monitor server kita di data center.

Model koneksi SSH menggunakan implementasi client-server, yang artinya agar koneksi SSH kita dapat diterima oleh server, maka server yang akan kita remote harus sudah terpasang dan menjalankan SSH daemon. SSH daemon ini akan melakukan listening terhadap koneksi dan port khusus SSH dan melakukan autentikasi koneksi, ketika autentikasi berhasil maka SSH daemon akan membuatkan satu shell session khusus kepada user yang melakukan koneksi ke server.

##### Bagaimana SSH melakukan autentikasi?

Ketika kita mencoba untuk melakukan koneksi SSH ke dalam server, maka kita diberikan dua opsi untuk melakukan autentikasi, menggunakan password dan menggunakan SSH key.

Koneksi menggunakan password yang terenkripsi lebih mudah digunakan untuk user yang baru pertama kali belajar menggunakan SSH karena lebih sederhana dan lebih cepat untuk terhubung dengan server. Namun, pada kenyataannya autentikasi menggunakan password sering disalahgunakan oleh bot (sebuah program yang dibuat oleh orang untuk melakukan sebuah pekerjaan secara terus menerus) dengan cara melakukan autentikasi secara terus menerus sampai menemukan password yang sesuai, biasanya ini disebut dengan metode ***brute force***

SSH Key adalah sebuah pasangan kunci kriptografi yang dapat digunakan untuk proses autentikasi koneksi SSH. Pasangan ini dinamakan dengan **public key** dan **private key**. Untuk public key dapat dibagikan dan dipasang secara bebas di server manapun, sedangkan private key harus kita simpan dan kita jaga di tempat kita sendiri dan tidak boleh diberikan ke orang lain. Ketika melakukan autentikasi menggunakan SSH key, SSH daemon pada server akan melakukan pengecekan terhadap public key yang ada pada server tersebut dengan private key yang diberikan oleh user, jika keduanya cocok, maka autentikasi berhasil dan user akan diperbolehkan untuk melakukan koneksi remote ke dalam server tersebut. Sedangkan jika salah satu dari pasangan kunci tersebut tidak cocok, maka koneksi SSH akan ditolak.

#### Membuat SSH Keys

Alasan saya selalu menggunakan SSH keys ketimbang menggunakan password adalah, tentunya lebih aman dibanding dengan menggunakan password, selain itu lebih mudah melakukan koneksi ke server tanpa memasukkan password.

Untuk membuat SSH key, kita dapat menggunakan perintah berikut


```shell
ssh-keygen
```

Akan muncul prompt yang fungsinya untuk menyimpan lokasi SSH keys yang akan dibuat, tekan ```Enter``` untuk membiarkan lokasi secara default, yaitu di direktori ```.ssh``` yang ada di home direktori perangkat kita

```terminal
Generating public/private rsa key pair.
Enter file in which to save the key (/home/upi/.ssh/id_rsa):
```

> Direktori ```.ssh``` adalah direktori tersembunyi (hidden) yang biasanya ada di home direktori

Prompt selanjutnya, kita diminta untuk memberikan sebuah passphrase untuk private key kita agar lebih aman ketika melakukan autentikasi SSH ke server. Secara default, jika kita menekan ```Enter```, maka kita tidak mengatur passphrase apapun pada private key milik kita, sedangkan jika kita memberikan passphrase, maka setiap kita akan melakukan autentikasi SSH ke server, sebelum melakukan pencocokan pasangan kunci, SSH daemon akan meminta kita untuk memberikan passphrase yang sesuai untuk private key yang kita gunakan.

```terminal
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

Ketika selesai, maka pasangan key yang kita buat tadi akan diletakkan di direktori default, biasanya ada di home direktori user yang sedang kita gunakan, misalnya ```/home/upi/.ssh```. Jika kita masuk ke dalam direktori tersebut, maka kita akan mendapatkan dua buah file pasangan key dengan nama seperti berikut:
- ```id_rsa``` > file ini adalah file private key yang perlu kita simpan baik-baik
- ```id_rsa.pub``` > file ini adalah file public key yang nantinya akan kita berikan kepada server yang akan kita remote

> Simpan baik-baik file ```id_rsa``` (private key) yang sudah kita buat, kalau perlu kita lakukan backup file private key tersebut sehingga lebih aman dan tidak mudah hilang

##### Membuat SSH keys dengan jumlah bits yang spesifik

Ketika membuat SSH keys, secara default akan menggunakan jumlah bits sebesar 2048. Bits ini digunakan untuk melakukan enkripsi dari pasangan key tersebut. Walaupun sudah terbilang cukup baik untuk sisi security dan enkripsi, tetapi kita juga bisa menentukan jumlah bits agar lebih aman.

Untuk menentukan jumlah bits ketika membuat SSH key, kita dapat menambahkan argument ```-b``` dilanjutkan dengan jumlah bits yang ingin kita berikan, contoh:

```shell
ssh-keygen -b 4096
```

#### Menyalin public key ke server

Ada dua cara yang biasanya saya gunakan untuk menyalin file public key ke dalam server yang akan kita remote, yaitu dengan cara menggunakan ```ssh-copy-id``` dan dengan cara manual.


##### Menyalin secara manual

Untuk menyalin dengan cara manual, dengan asumsi kita bisa mengakses server kita baik secara remote ataupun langsung dari server. Pada perangkat milik kita, copy isi file dari public key dengan menggunakan perintah berikut:

```shell
cat ~/.ssh/id_rsa.pub
```

> ```~/``` adalah cara singkat untuk menuliskan path untuk direktori /home/{user}

```terminal
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCqql6MzstZYh1TmWWv11q5O3pISj2ZFl9HgH1JLknLLx44+tXfJ7mIrKNxOOwxIxvcBF8PXSYvobFYEZjGIVCEAjrUzLiIxbyCoxVyle7Q+bqgZ8SeeM8wzytsY+dVGcBxF6N4JS+zVk5eMcV385gG3Y6ON3EG112n6d+SMXY0OEBIcO6x+PnUSGHrSgpBgX7Ks1r7xqFa7heJLLt2wWwkARptX7udSq05paBhcpB0pHtA1Rfz3K2B+ZVIpSDfki9UVKzT8JUmwW6NNzSgxUfQHGwnW7kj4jp4AT0VZk3ADw497M2G/12N0PPB5CnhHf7ovgy6nL1ikrygTKRFmNZISvAcywB9GVqNAVE+ZHDSCuURNsAInVzgYo9xgJDW8wUw2o8U77+xiFxgI5QSZX3Iq7YLMgeksaO4rBJEa54k8m5wEiEE1nUhLuJ0X/vh2xPff6SQ1BL/zkOhvJCACK6Vb15mDOeCSq54Cr7kvS46itMosi/uS66+PujOO+xt/2FWYepz6ZlN70bRly57Q06J+ZJoc9FfBCbCyYH7U/ASsmY095ywPsBo1XQ9PqhnN1/YOorJ068foQDNVpm146mUpILVxmq41Cj55YKHEazXGsdBIbXWhcrRf4G2fJLRcGUr9q8/lERo9oxRm5JFX6TCmj6kmiFqv+Ow9gI0x8GvaQ== upi@macbook
```

Setelah kita salin, pada server yang akan kita remote, buat sebuah direktori ```.ssh``` pada home direktori user yang akan kita gunakan sebegai user SSH, contoh:

```shell
mkdir -p /home/{remote user}/.ssh
```

Atau jika kita ingin menggunakan user root sebagai user SSH kita

```shell
sudo mkdir -p /root/.ssh
```

Kemudian kita copy kan isi dari public key kita ke dalam file ```authorized_keys``` di dalam direktori ```.ssh``` yang sudah kita buat dengan perintah berikut:

```shell
echo "{isi public key}" >> /home/{remote user}/.ssh/authorized_keys
```

> File ```authorized_keys``` adalah file default yang berisikan konten-konten file public key dari berbagai macam perangkat

Setelah itu kita atur hak akses dari file ```authorized_keys```

```shell
chmod 600 /home/{remote user}/.ssh/authorized_keys
```

##### Menyalin dengan ```ssh-copy-id```

Jika kita masih bisa mengakses koneksi SSH ke server menggunakan autentikasi password, cara mudah untuk menyalin public key milik kita ke server adalah dengan menggunakan tool bernama ```ssh-copy-id```. Untuk menyalin public key, cukup masukkan perintah berikut:

```shell
ssh-copy-id username@server.com
```

> ```username``` adalah nama dari user yang akan kita gunakan sebagai SSH User. Sedangkan ```server.com``` adalah hostname dari server kita, bisa berupa nama domain, alias, atau IP Address.

Kemudian akan ada prompt yang meminta kita untuk memasukkan password sebagai autentikasi untuk koneksi SSH. 

```terminal
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
username@server.com's password:
```

Setelah memasukkan password maka konten dari public key kita secara otomatis akan dimasukkan ke dalam file ```authorized_keys``` yang ada di dalam server.

```terminal
Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'username@server.com'"
and check to make sure that only the key(s) you wanted were added.
```

#### Cara terhubung ke server menggunakan SSH

Secara sederhana, kita cukup memasukkan perintah berikut untuk terhubung ke server menggunakan SSH baik itu menggunakan password maupun menggunakan SSH keys.

```shell
ssh server.com 
```

Jika username SSH kita berbeda dari username yang sedang login pada perangkat kita, maka kita bisa menggunakan format perintah berikut

```shell
ssh username@server.com
```

##### Hanya menjalankan satu perintah

Kita dapat menjalankan hanya satu buah perintah saja ketika melakukan koneksi SSH tanpa perlu masuk ke dalam shell session dengan cara menambahkan perintah apa yang ingin kita lakukan ketika melakukan koneksi SSH, contoh:

```shell
ssh username@server.com reboot
```

Setelah koneksi SSH berhasil, maka perintah yang kita tuliskan akan langsung dieksekusi. Setelah itu koneksi SSH akan secara langsung ditutup oleh SSH daemon.

##### Terhubung ke server dengan port yang berbeda

Jika kita ingin melakukan koneksi SSH ke server yang menggunakan port SSH berbeda, kita cukup menambahkan argument ```-p``` sebelum memberikan username dan hostname, contoh:

```shell
ssh -p 2222 username@server.com
```

#### Konfigurasi SSH pada server

> Seluruh konfigurasi yang dilakukan di bawah, dilakukan pada SSH server atau di server tempat SSH daemon berada

Kita dapat melakukan konfigurasi terhadap SSH daemon atau SSH server pada server kita, ada banyak konfigurasi yang dapat kita lakukan, seperti:

##### Mematikan autentikasi password

Jika kita ingin menggunakan autentikasi menggunakan SSH keys, ada baiknya untuk mematikan fitur autentikas password pada SSH daemon kita. Untuk mematikan autentikasi password, buka file konfigurasi ssh di direktori ```/etc/ssh/sshd_config``` dengan hak akses ```root``` bisa menggunakan user root secara langsung atau menggunakan ```sudo```.

```shell
sudo vim /etc/ssh/sshd_config
```

Di dalam file konfigurasi SSH, cari baris konfigurasi dengan kata kunci ```PasswordAuthentication```. Jika konfigurasinya diberikan *comment* (tanda ```#```), hapus tanda tersebut dan atur seperti contoh berikut:

<div class=filename>/etc/ssh/sshd_config</div>

```
PasswordAuthentication no
```

Setelah melakukan perubahan, simpan dan tutup file konfigurasinya. Kemudian kita perlu melakukan restart pada SSH service pada server.

Pada Ubuntu/Debian based server:

```shell
sudo systemctl restart ssh
```

Pada CentOS/Fedora based server:

```shell
sudo systemctl restart sshd
```

##### Mengubah SSH port pada server

Untuk alasan keamanan, kita bisa mengubah SSH port pada server. Ini akan mengurangi jumalah dan mempersulit para *bot* yang ingin mencoba mengakses koneksi SSH pada server kita secara paksa.

Untuk mengubah port SSH daemon pada server, buka kembali file konfigurasi ssh di ```/etc/ssh/sshd_config```.

```shell
sudo vim /etc/ssh/sshd_config
```

Kemudian cari baris konfigurasi dengan kata kunci ```Port``` dan ubah port default (22) menjadi port yang kita inginkan, contoh:

<div class=filename>/etc/ssh/sshd_config</div>

```
Port 2222
```

Setelah melakukan perubahan, simpan dan tutup file konfigurasinya. Kemudian kita perlu melakukan restart pada SSH service pada server.

Pada Ubuntu/Debian based server:

```shell
sudo systemctl restart ssh
```

Pada CentOS/Fedora based server:

```shell
sudo systemctl restart sshd
```

##### Membatasi user mana saja yang bisa melakukan koneksi SSH

Untuk membatasi user mana saja yang diperbolehkan untuk melakukan koneksi SSH ke server kita, biasanya jika hanya beberapa user saja saya akan memasukkan user mana saja yang diizinkan secara satu per satu, tapi jika ada banyak user, maka saya akan buatkan group khusus untuk user-user tersebut.

Buka kembali file konfigurasi SSH

```shell
sudo vim /etc/ssh/sshd_config
```

Kemudian jika kita ingin menambahkan user secara satu per satu, cari baris konfigurasi dengan kata kunci ```AllowUsers```. Jika tidak ada, kita bisa tambahkan di baris paling bawah file konfigurasi. Kemudian tambahkan user yang ingin diberikan akses SSH, contoh:

<div class=filename>/etc/ssh/sshd_config</div>

```
AllowUsers user1 user2 user3
```

Atau jika kita ingin menambahkan user banyak dengan menggunakan group, cari baris konfigurasi dengan kata kunci ```AllowGroups```. Jika tidak ada, kita bisa tambahkan di baris paling bawah file konfigurasi. Kemudian tambahkan group yang ingin diberikan akses SSH, contoh:

<div class=filename>/etc/ssh/sshd_config</div>

```
AllowGroups group1 group2 admin
```

Setelah melakukan konfigurasi, simpan dan tutup file konfigurasinya. Kemudian kita perlu melakukan restart pada SSH service pada server.

Pada Ubuntu/Debian based server:

```shell
sudo systemctl restart ssh
```

Pada CentOS/Fedora based server:

```shell
sudo systemctl restart sshd
```

##### Menonaktifkan koneksi SSH untuk user root

Sangat disarankan untuk sepenuhnya menonaktifkan koneksi SSH untuk user root setelah kita mengatur user SSH yang memiliki hak akses root menggunakan perintah ```sudo```. Untuk menonaktifkan koneksi SSH pada user root, kita buka kembali file konfigurasi SSH di ```/etc/ssh/sshd_config```.

```shell
sudo vim /etc/ssh/sshd_config
```

Kemudian cari baris konfigurasi dengan kata kunci ```PermitRootLogin```. Jika baris tersebut di *comment*, cukup hapus tanda ```#```, dan ganti value-nya menjadi ```no```. Contoh:

<div class=filename>/etc/ssh/sshd_config</div>

```
PermitRootLogin no
```

Setelah melakukan konfigurasi, simpan dan tutup file konfigurasinya. Kemudian kita perlu melakukan restart pada SSH service pada server.

Pada Ubuntu/Debian based server:

```shell
sudo systemctl restart ssh
```

Pada CentOS/Fedora based server:

```shell
sudo systemctl restart sshd
```

#### Kesimpulan

Perintah dan konfigurasi yang dilakukan di atas, menurut saya sudah mencukupi untuk pengguna yang baru belajar menggunakan SSH. Walaupun masih banyak konfigurasi SSH lainnya seperti tunneling dan lain-lain, namun akan saya coba bahas di tulisan terpisah. 😁