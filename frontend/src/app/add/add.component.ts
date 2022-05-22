import {
  Component, OnInit, ChangeDetectorRef
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { blogService } from '../service/blog.service';
import { Location } from '@angular/common';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  blogForm: FormGroup;
  imageSrc: any;

  constructor(
    private cd: ChangeDetectorRef,
    private location: Location,
    private toastr: ToastrService,
    private blogService: blogService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      author: [null, [Validators.required]],
      title: [null, Validators.required],
      content: [null, Validators.required],
      profileImg: [null, Validators.required]
    });
  }
  addblog() {
    if (this.blogForm.valid) {
      const formData = new FormData();
      formData.append('author', this.blogForm.value.author);
      formData.append('title', this.blogForm.value.title);
      formData.append('content', this.blogForm.value.content);
      formData.append('profileImg', this.blogForm.value.profileImg);

      this.blogService.addblog(formData).subscribe(result => {
        if (result.tatus) {
          this.location.back();
          this.toastr.success(result.msg);
        } else {
          this.toastr.error(result.msg);
        }
      });
    } else {
      this.toastr.error('Fill all the required fields');
      return false;
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.blogForm.controls[controlName].hasError(errorName);
  }

  dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const fileImage = file.name.split('.');
          const fileExt = fileImage[fileImage.length - 1];
          const fileType = file.type;
          const size = file.size;
          if (fileType.includes('image')) {
            if ('|jpg|png|jpeg|'.indexOf(fileExt) === -1) {
              this.imageSrc = '../../../../assets/img/blog_profile.png';
              this.toastr.error('IMAGE_FORMAT_NOT_SUPPORTED');
              return false;
            } else if (size >= 20185920) { // 20mb
              this.imageSrc = '../../../../assets/img/blog_profile.png';
              this.toastr.error('IMAGE_SIZE_EXCEED');
              return false;
            } else {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                this.imageSrc = reader.result;
              };
              this.blogForm.patchValue({
                profileImg: file
              });
              return true;
            }
          } else {
            this.imageSrc = '../../../../assets/img/blog_profile.png';
            this.toastr.error('FILE_FORMAT_NOT_SUPPORTED');
          }
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
  
  fileOver(event) {
    // Gets called after a file-drop.
  }

  fileLeave(event) {
    // Gets called when you leave a file-drop.
  }
}
