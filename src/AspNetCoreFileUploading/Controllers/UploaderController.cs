// Copyright © 2017 Dmitry Sikorsky. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace AspNetCoreFileUploading
{
  public class UploaderController : Controller
  {
    private IHostingEnvironment hostingEnvironment;

    public UploaderController(IHostingEnvironment hostingEnvironment)
    {
      this.hostingEnvironment = hostingEnvironment;
    }

    [HttpPost]
    public async Task<IActionResult> Index(IList<IFormFile> files)
    {
      foreach (IFormFile source in files)
      {
        string filename = ContentDispositionHeaderValue.Parse(source.ContentDisposition).FileName.Trim('"');

        filename = this.EnsureCorrectFilename(filename);

        using (FileStream output = System.IO.File.Create(this.GetPathAndFilename(filename)))
          await source.CopyToAsync(output);
      }

      return this.View();
    }

    private string EnsureCorrectFilename(string filename)
    {
      if (filename.Contains("\\"))
        filename = filename.Substring(filename.LastIndexOf("\\") + 1);

      return filename;
    }

    private string GetPathAndFilename(string filename)
    {
      string path = this.hostingEnvironment.WebRootPath + "\\uploads\\";

      if (!Directory.Exists(path))
        Directory.CreateDirectory(path);

      return path + filename;
    }
  }
}