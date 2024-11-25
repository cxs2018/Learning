class Cancel {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export function isCancel(error: any) {
  return error instanceof Cancel;
}

export class CancelToken {
  public resolve: any;
  source() {
    return {
      token: new Promise((resolve, reject) => {
        this.resolve = resolve;
      }),
      cancel: (message: string) => {
        this.resolve(new Cancel(message));
      },
    };
  }
}
