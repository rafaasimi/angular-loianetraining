import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadFileService } from './upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {

  files: Set<File> = new Set();

  constructor(private uploadFileService: UploadFileService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    console.log(event);
    this.files = new Set();

    const selectedFiles = <FileList>event.srcElement.files;

    const fileNames = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    document.getElementById('formFile')!.innerHTML = fileNames.join(', ');

  }

  onUpload() {
    if(this.files && this.files.size > 0) {
      this.uploadFileService.upload(this.files, environment.BASE_URL + '/upload')
      .subscribe(response => console.log('Upload concluído'))
    }
  }
}
